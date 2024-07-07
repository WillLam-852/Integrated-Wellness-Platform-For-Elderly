package com.boilerreactnativeapplication.presentations.viewmodels

import android.app.Application
import android.util.Log
import android.util.Size
import android.view.Surface
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.boilerreactnativeapplication.data.person.*
import com.boilerreactnativeapplication.data.plan.model.AbstractExercisePlan
import com.boilerreactnativeapplication.data.plan.model.ExercisePlans
import com.boilerreactnativeapplication.data.plan.model.ExerciseState
import com.boilerreactnativeapplication.usecases.exercisecenter.ExerciseCenter
import com.boilerreactnativeapplication.usecases.exercisecenter.observer.ExerciseCenterCountObserver
import com.boilerreactnativeapplication.usecases.exercisecenter.observer.ExerciseCenterDebugMsgObserver
import com.boilerreactnativeapplication.usecases.exercisecenter.observer.ExerciseCenterPlanObserver
import com.boilerreactnativeapplication.usecases.exercisecenter.observer.ExerciseCenterProgressObserver
import com.boilerreactnativeapplication.utils.CAMERA_FACING_BACK
import com.boilerreactnativeapplication.utils.CAMERA_FACING_FRONT
import com.boilerreactnativeapplication.utils.SupportFunctions
import com.google.mediapipe.components.CameraHelper
import kotlinx.coroutines.launch

class PoseInspectorViewModel(application: Application, plans: ExercisePlans?): AndroidViewModel(application),
    ExerciseCenterPlanObserver,
    ExerciseCenterCountObserver,
    ExerciseCenterProgressObserver,
    ExerciseCenterDebugMsgObserver
{

    companion object {
        private const val LOG_TAG: String = "PoseInspectorViewModel"
    }

    //----------------------- Activity Attributes -------------------
    var cameraFacing: CameraHelper.CameraFacing = CAMERA_FACING_BACK
    var isSurfaceDestroyed: Boolean = false
    var rotation: Int = Surface.ROTATION_0
    var preRotation: Int = Surface.ROTATION_0

    private var targetCoordinate: IntArray? = null
    private var displaySize: Size? = null

    // Exercise Center
    private var exerciseCenter: ExerciseCenter = ExerciseCenter(plans)

//------------------------------------- Live Data Part ---------------------------------------------


    private val _plan = MutableLiveData<AbstractExercisePlan>()
    val plan: LiveData<AbstractExercisePlan>
        get() = _plan

    private val _count = MutableLiveData<Int>(0)
    val count: LiveData<Int>
        get() = _count

    private val _countExerciseState = MutableLiveData<ExerciseState>()
    val countExerciseState: LiveData<ExerciseState>
        get() = _countExerciseState

    private val _progress = MutableLiveData<Int>(0)
    val progress: LiveData<Int>
        get() = _progress

    private val _isFinishExercise = MutableLiveData<Boolean>(false)
    val isFinishExercise: LiveData<Boolean>
        get() = _isFinishExercise

    private val _isShowCountTick = MutableLiveData<Boolean>(false)
    val isShowCountTick: LiveData<Boolean>
        get() = _isShowCountTick

    private val _debugMsg = MutableLiveData<String>("")
    val debugMsg: LiveData<String>
        get() = _debugMsg


//------------------------------------- Initialization ---------------------------------------------


    init {
        registerExerciseCenterObservers()
        initPlanInfo()
    }

    private fun initPlanInfo() {
        exerciseCenter.initPlan()
    }


//------------------------------------- Lifecycle Functions ----------------------------------------


    override fun onCleared() {
        super.onCleared()
        removeExerciseCenterObservers()
    }


//------------------------------------- Data Update Functions --------------------------------------


    fun updatePerson(person: Person) {
        Log.i(LOG_TAG, person.toString())
        exerciseCenter.updatePerson(person)
    }

    // TODO: Remove it after progress change function is finished.
    fun updateProgress(isMatchTargets: Boolean) {
        exerciseCenter.updateProgress(isMatchTargets)
    }

    fun updateDisplaySize(size: Size) {
        viewModelScope.launch {
            displaySize = size
        }
    }


//------------------------------------- Activity Attribute Update Functions ------------------------


    fun updateRotationAccordingToDisplay(displayRotation: Int) {
        this.rotation = displayRotation
    }

    fun updateRotationInPoseTracking() {
        this.rotation = SupportFunctions.getRotationInPoseTracking(this.rotation)
    }

    fun toggleCameraInput() {
        cameraFacing = if (cameraFacing == CAMERA_FACING_FRONT) {
            CAMERA_FACING_BACK
        } else {
            CAMERA_FACING_FRONT
        }
    }


//------------------------------------- Observer Functions -----------------------------------------


    private fun registerExerciseCenterObservers() {
        exerciseCenter.registerExerciseCenterCountObserver(this)
        exerciseCenter.registerExerciseCenterProgressObserver(this)
        exerciseCenter.registerExerciseCenterPlanObserver(this)
        exerciseCenter.registerExerciseCenterDebugMsgObserver(this)
    }

    private fun removeExerciseCenterObservers() {
        exerciseCenter.removeExerciseCenterCountObserver(this)
        exerciseCenter.removeExerciseCenterProgressObserver(this)
        exerciseCenter.removeExerciseCenterPlanObserver(this)
        exerciseCenter.removeExerciseCenterDebugMsgObserver(this)
    }

    override fun updateExerciseCenterCount(count: Int, countExerciseState: ExerciseState?) {
        _count.postValue(count)
        _isShowCountTick.postValue(true)
        countExerciseState?.let { _countExerciseState.postValue(it) }
    }

    override fun updateExerciseCenterProgress(progress: Int) {
        _progress.postValue(progress)
    }

    override fun updateExerciseCenterPlan(plan: AbstractExercisePlan?, isFinished: Boolean) {
        plan?.let{ _plan.postValue(it) }
        _isFinishExercise.postValue(isFinished)
    }

    override fun updateExerciseCenterDebugMsg(message: String) {
        _debugMsg.postValue(message)
    }
}