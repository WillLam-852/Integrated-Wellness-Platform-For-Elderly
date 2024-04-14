package com.boilerreactnativeapplication.reactnative.modules

import android.app.Activity
import android.content.Intent
import android.util.Log
import com.boilerreactnativeapplication.presentations.PoseInspectorActivity
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.IllegalViewOperationException

class NativeCameraModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val LOG_TAG: String = "CameraModule"
        const val MODULE_NAME: String = "CameraModule"

        const val REQUEST_CODE_POSE_INSPECTOR_ACTIVITY: Int  = 1;

        private const val ERROR_CALLBACK_FAIL = "Call back error"
        private const val ERROR_CURRENT_ACTIVITY_NOT_FOUND = "Current activity not found"
        private const val ERROR_START_POSE_INSPECTOR_FAIL = "Start pose inspector fail"

    }

    private lateinit var successCallback: Callback;
    private lateinit var failureCallback: Callback;

    override fun getName(): String {
        return MODULE_NAME
    }


//------------------------------------- Callback Functions for Value Return ------------------------


    /**
     * The initialization part sets the activity event listener to return value to react side; Add
     * the call back function to send the data back to react native side.
     * */
    init {
        val activityEventListener: ActivityEventListener = object : BaseActivityEventListener() {
            override fun onActivityResult(
                activity: Activity,
                requestCode: Int,
                resultCode: Int,
                data: Intent?
            ) {
                if (requestCode == REQUEST_CODE_POSE_INSPECTOR_ACTIVITY && resultCode == Activity.RESULT_OK) {
                    // Callback: Success.
                    try {
                        val result: WritableMap = Arguments.createMap()
                        result.putInt("code", 16)
                        result.putString("action", "finish")
                        result.putString("activityName", "basic one")
                        val count: Int? = data?.getStringExtra("count")?.toInt()
                        successCallback.invoke(result)
                    } catch (e: IllegalViewOperationException) {
                        failureCallback.invoke(e.message)
                    }
                } else {
                    // Callback: Error.
                    failureCallback.invoke(ERROR_CALLBACK_FAIL)
                }
            }
        }
        reactContext.addActivityEventListener(activityEventListener)
    }


//------------------------------------- React Native Bridge Functions ------------------------------



    @ReactMethod
    fun start(
        name: String,
        location: String,
        failureCallback: Callback,
        successCallback: Callback
    ) {
        val callbackDataId: Int = 16
        Log.d(LOG_TAG, "Create callback event called with name: $name and location $location")

        this.failureCallback = failureCallback
        this.successCallback = successCallback

        if(currentActivity == null) {
            this.failureCallback.invoke(ERROR_CURRENT_ACTIVITY_NOT_FOUND)
            return
        }

        try {
            val intent = Intent(currentActivity, PoseInspectorActivity::class.java)
            currentActivity?.startActivityForResult(intent, REQUEST_CODE_POSE_INSPECTOR_ACTIVITY)
        } catch (exception: Exception) {
            Log.e(LOG_TAG, exception.message!!)
            this.failureCallback.invoke(ERROR_START_POSE_INSPECTOR_FAIL)
        }

    }

}