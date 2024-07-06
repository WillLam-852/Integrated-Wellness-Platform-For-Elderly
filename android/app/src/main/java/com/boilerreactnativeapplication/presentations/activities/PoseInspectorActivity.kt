package com.boilerreactnativeapplication.presentations.activities

import android.app.Activity
import android.content.Intent
import android.graphics.SurfaceTexture
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.util.Size
import android.view.SurfaceHolder
import android.view.SurfaceView
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import com.boilerreactnativeapplication.R
import com.boilerreactnativeapplication.data.person.Position
import com.boilerreactnativeapplication.data.plan.ExercisePlanE1
import com.boilerreactnativeapplication.data.plan.ExercisePlanE2
import com.boilerreactnativeapplication.data.plan.ExercisePlanE3
import com.boilerreactnativeapplication.data.plan.model.AbstractExercisePlan
import com.boilerreactnativeapplication.data.plan.model.ExercisePlans
import com.boilerreactnativeapplication.databinding.ActivityPoseInspectorBinding
import com.boilerreactnativeapplication.presentations.viewmodelfactories.PoseInspectorViewModelFactory
import com.boilerreactnativeapplication.presentations.viewmodels.PoseInspectorViewModel
import com.boilerreactnativeapplication.reactnative.modules.NativeCameraModule
import com.boilerreactnativeapplication.utils.*
import com.google.mediapipe.components.CameraHelper
import com.google.mediapipe.components.CameraXPreviewHelper
import com.google.mediapipe.components.ExternalTextureConverter
import com.google.mediapipe.components.FrameProcessor
import com.google.mediapipe.components.PermissionHelper
import com.google.mediapipe.formats.proto.LandmarkProto
import com.google.mediapipe.framework.AndroidAssetUtil
import com.google.mediapipe.framework.Packet
import com.google.mediapipe.framework.PacketGetter
import com.google.mediapipe.glutil.EglManager
import com.google.protobuf.InvalidProtocolBufferException

class PoseInspectorActivity : AppCompatActivity() {

    companion object {
        private const val LOG_TAG = "PoseInspectorActivity"
    }

    init {
        System.loadLibrary("mediapipe_jni")
        System.loadLibrary("opencv_java3")
    }

    private var binding: ActivityPoseInspectorBinding? = null
    private var viewModel: PoseInspectorViewModel? = null
    private var viewModelFactory: PoseInspectorViewModelFactory? = null

    var outputVideoStream: String = PROCESSED_VIDEO_STREAM

    // {@link SurfaceTexture} where the camera-preview frames can be accessed.
    private var previewFrameTexture: SurfaceTexture? = null
    // {@link SurfaceView} that displays the camera-preview frames processed by a MediaPipe graph.
    private var previewDisplayView: SurfaceView? = null
    // Creates and manages an {@link EGLContext}.
    private var eglManager: EglManager? = null
    // Sends camera-preview frames into a MediaPipe graph for processing, and displays the processed
    // frames onto a {@link Surface}.
    private var processor: FrameProcessor? = null
    // Converts the GL_TEXTURE_EXTERNAL_OES texture from Android camera into a regular texture to be
    // consumed by {@link FrameProcessor} and the underlying MediaPipe graph.
    private var converter: ExternalTextureConverter? = null

    // Handles camera access via the {@link CameraX} Jetpack support library.
    private var cameraHelper: CameraXPreviewHelper? = null


//------------------------------------- Initialization ---------------------------------------------


    private fun getExercisePlanFromIntent(): ExercisePlans? {
//        var plans: ExercisePlans? = null
//        plans = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
//            intent.getSerializableExtra("plans", ExercisePlans::class.java)
//        } else {
//            intent.getSerializableExtra("plans") as ExercisePlans
//        }
        var plans: ExercisePlans? = ExercisePlans(listOf<AbstractExercisePlan>(ExercisePlanE3()))
        return plans;
    }

    private fun initActivityBindingAndVM(plans: ExercisePlans?) {
        binding = DataBindingUtil.setContentView(this, R.layout.activity_pose_inspector)
        viewModelFactory = PoseInspectorViewModelFactory(application, plans)
        viewModel = ViewModelProvider(this, viewModelFactory!!).get(PoseInspectorViewModel::class.java)
        binding!!.lifecycleOwner = this
    }

    private fun initActivityContentClickListener() {
        binding?.let { binding ->
            binding.finishBtn.setOnClickListener { finishCurrentActivity() }
        }
    }

    private fun initObserveFunction() {
        binding?.let { binding ->
            viewModel?.let { viewModel ->
                viewModel.plan.observe(this) { binding.execerciseNameTv.text = it.name }
                viewModel.count.observe(this) { binding.countTv.text = it.toString() }
                viewModel.progress.observe(this) { binding.progressPb.progress = it }
                viewModel.debugMsg.observe(this) { binding.debugMsgTv.text = it }
//            viewModel.headPosition.observe(this) { updateHeadCoordinate(it) }
            }?:Log.e(LOG_TAG, "View Model has no been initialized.")
        } ?: Log.e(LOG_TAG, "Binding has ne been initialized.")
    }

//------------------------------------- Lifecycle Functions ----------------------------------------


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val plans: ExercisePlans? = getExercisePlanFromIntent()
        initActivityBindingAndVM(plans)
        initActivityContentClickListener()
        initObserveFunction()
        initMediapipeModules()
        // Request Camera Permission.
        PermissionHelper.checkAndRequestCameraPermissions(this)
    }

    override fun onResume() {
        super.onResume()
        // Log.i(LOG_TAG, "onResume, run.")
        initConverter()
        checkPermissionAndStartCamera()
    }

    override fun onPause() {
        super.onPause()
        // Log.i(LOG_TAG, "onPause, run.")
        closeConverter()
    }

    override fun onRestart() {
        super.onRestart()
        // Log.i(LOG_TAG, "onRestart, run.")
        initPreviewDisplayView()
    }


//------------------------------------- Callback Functions -----------------------------------------

    private fun finishCurrentActivity() {
        val intent = Intent().apply {
            putExtra("count", (99).toString())
        }
        setResult(Activity.RESULT_OK, intent)
        finish()
    }

    private fun initMediapipeModules() {
        previewDisplayView = SurfaceView(this)
        setupPreviewDisplayView()
        AndroidAssetUtil.initializeNativeAssetManager(this)
        eglManager = EglManager(null)
        initializeProcessor()
    }

//------------------------------------- Processor Functions ----------------------------------------


    private fun initializeProcessor() {
        Log.i(LOG_TAG, "initializeProcessor: run.")
        /**
         * If we change the output stream to null, nothing will show in the screen.
         * If we change the output stream to OUTPUT_VIDEO_STREAM_NAME, skeleton will show.
         * If we change the output stream to INPUT_VIDEO_STREAM_NAME, the camera without skeleton will show.
         * */
        processor = FrameProcessor(
            this,
            eglManager!!.nativeContext,
            BINARY_GRAPH_NAME,
            ORIGINAL_VIDEO_STREAM,
            outputVideoStream
        )

        // Is skeleton detected by camera.
        processor!!.addPacketCallback(
            OUTPUT_LANDMARK_STREAM_NAME
        ) { packet: Packet ->
            try {
                val poseLandmarks = PacketGetter.getProtoBytes(packet)
                val normalizedLandmarkList: LandmarkProto.NormalizedLandmarkList = LandmarkProto.NormalizedLandmarkList.parseFrom(poseLandmarks)
                val landmarkList = normalizedLandmarkList.landmarkList
                viewModel!!.updatePerson(DataConverter.convertLandmarkToPerson(landmarkList))
            } catch (exception: InvalidProtocolBufferException) {
                Log.e(LOG_TAG, "Failed to get proto.", exception)
            }
        }

        // Is person present at camera.
        processor!!.addPacketCallback(
            OUTPUT_POSE_PRESENCE_STREAM_NAME
        ) { packet: Packet ->
            try {
                val isPosePresence = PacketGetter.getBool(packet)
                // Log.d(LOG_TAG, isPosePresence.toString())
            } catch (exception: InvalidProtocolBufferException) {
                Log.e(LOG_TAG, "Failed to get the landmark presence", exception)
            }
        }
    }


//------------------------------------- Permission Functions ---------------------------------------


    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        PermissionHelper.onRequestPermissionsResult(requestCode, permissions, grantResults)
    }


//------------------------------------- Display Functions ------------------------------------------


    private fun initPreviewDisplayView() {
        previewDisplayView = SurfaceView(this)
        setupPreviewDisplayView()
    }

    private fun setupPreviewDisplayView() {

        previewDisplayView?.visibility = View.GONE
        val viewGroup: ViewGroup = findViewById(R.id.preview_display_layout)
        viewGroup.removeAllViews()
        viewGroup.addView(previewDisplayView)

        previewDisplayView?.holder?.addCallback(object : SurfaceHolder.Callback {
            override fun surfaceCreated(holder: SurfaceHolder) {
                Log.i(LOG_TAG, "surfaceCreated: run.")
                processor?.videoSurfaceOutput?.setSurface(holder.surface)
            }
            override fun surfaceChanged(
                holder: SurfaceHolder,
                format: Int,
                width: Int,
                height: Int
            ) {
                Log.i(LOG_TAG, "surfaceChanged: run.")
                // (Re-)Compute the ideal size of the camera-preview display (the area that the
                // camera-preview frames get rendered onto, potentially with scaling and rotation)
                // based on the size of the SurfaceView that contains the display.
                val viewSize = Size(width, height)
                val displaySize: Size = cameraHelper!!.computeDisplaySizeFromViewSize(viewSize)

                // The camera will rotate the image, so we should rotate back to correct direction.
                // Get the frame size which captures from camera.
                val rotatedDisplaySize: Size = Size(displaySize.height, displaySize.width)
                converter!!.setSurfaceTextureAndAttachToGLContext(
                    previewFrameTexture, rotatedDisplaySize.width, rotatedDisplaySize.height
                )
            }
            override fun surfaceDestroyed(holder: SurfaceHolder) {
                Log.i(LOG_TAG, "surfaceDestroyed, run.")
                processor?.videoSurfaceOutput?.setSurface(null)
                processor?.videoSurfaceOutput?.setFlipY(FLIP_FRAMES_VERTICALLY)
            }
        })
    }


//------------------------------------- Camera Functions -------------------------------------------


    // TODO: Change here after add view model
    private fun checkPermissionAndStartCamera() {
        viewModel?.let {
            if (PermissionHelper.cameraPermissionsGranted(this)) {
                startCamera(it.cameraFacing)
            } else {
                Log.e(LOG_TAG, "Application doesn't have the permission to open camera.")
            }
        }?:let{
            Log.e(LOG_TAG, "View Model not initialized yet.")
        }
    }

    private fun startCamera(cameraFacing: CameraHelper.CameraFacing) {
        cameraHelper = CameraXPreviewHelper()
        cameraHelper!!.setOnCameraStartedListener(
            CameraHelper.OnCameraStartedListener { surfaceTexture: SurfaceTexture? ->
                previewFrameTexture = surfaceTexture
                // Make the display view visible to start showing the preview.
                previewDisplayView!!.visibility = View.VISIBLE
            })
        cameraHelper
            ?.startCamera(this, cameraFacing, null)
            ?:let { Log.e(LOG_TAG, "Camera Helper is NULL!") }
    }


//------------------------------------- Converter Functions ---------------------------------------


    private fun initConverter() {
        eglManager?.let {
            converter = ExternalTextureConverter(it.context,2)
            converter!!.setFlipY(FLIP_FRAMES_VERTICALLY)
            converter!!.setConsumer(processor)
        }?:let{
            Log.e(LOG_TAG, "EglManager has not be initialized.")
        }
    }

    private fun closeConverter() {
        converter
            ?.close()
            ?:let {
                Log.e(LOG_TAG, "ExternalTextureConverter has not be initialized.")
            }
    }


//------------------------------------- Event Functions --------------------------------------------


    private fun releaseProcessingParam() {
        closeConverter()
        eglManager = null
        converter = null
        processor = null
        previewDisplayView = null
    }


//------------------------------------- Observe Update Functions -----------------------------------



}