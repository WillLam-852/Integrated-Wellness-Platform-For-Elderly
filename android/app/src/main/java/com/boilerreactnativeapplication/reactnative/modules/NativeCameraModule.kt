package com.boilerreactnativeapplication.reactnative.modules

import android.app.Activity
import android.content.Intent
import android.util.Log
import com.boilerreactnativeapplication.data.plan.ExercisePlanE1
import com.boilerreactnativeapplication.data.plan.model.AbstractExercisePlan
import com.boilerreactnativeapplication.data.plan.model.ExercisePlanInput
import com.boilerreactnativeapplication.data.plan.model.ExercisePlanInputList
import com.boilerreactnativeapplication.data.plan.model.ExercisePlans
import com.boilerreactnativeapplication.presentations.activities.PoseInspectorActivity
import com.boilerreactnativeapplication.presentations.activities.SimulateInspectorActivity
import com.boilerreactnativeapplication.utils.DataConverter.convertExercisePlanInputToPlan
import com.boilerreactnativeapplication.utils.DataConverter.convertJsonArrayStringToExercisePlan
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.IllegalViewOperationException
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

class NativeCameraModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val LOG_TAG: String = "CameraModule"
        const val MODULE_NAME: String = "CameraModule"

        const val REQUEST_CODE_POSE_INSPECTOR_ACTIVITY: Int  = 1;
        const val REQUEST_CODE_SIMULATE_INSPECTOR_ACTIVITY: Int = 2;

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
//                if (requestCode == REQUEST_CODE_SIMULATE_INSPECTOR_ACTIVITY && resultCode == Activity.RESULT_OK) {
//                    // Callback: Success.
//                    try {
//                        val result: WritableMap = Arguments.createMap()
//                        result.putInt("code", 16)
//                        result.putString("action", "finish")
//                        result.putString("activityName", "basic one")
//                        val count: Int? = data?.getStringExtra("count")?.toInt()
//                        successCallback.invoke(result)
//                    } catch (e: IllegalViewOperationException) {
//                        failureCallback.invoke(e.message)
//                    }
//                } else {
//                    // Callback: Error.
//                    failureCallback.invoke(ERROR_CALLBACK_FAIL)
//                }
            }
        }
        reactContext.addActivityEventListener(activityEventListener)
    }


//------------------------------------- React Native Bridge Functions ------------------------------


    /**
     * Function trigger by react native side.
     * */
    @ReactMethod
    fun start(
        exercisesJsonString: String,
        failureCallback: Callback,
        successCallback: Callback
    ) {
        Log.d(LOG_TAG, "The exercisesJsonString is: ${exercisesJsonString}")
        this.failureCallback = failureCallback
        this.successCallback = successCallback
        val exercises = convertJsonArrayStringToExercisePlan(exercisesJsonString)
        if(currentActivity == null) {
            this.failureCallback.invoke(ERROR_CURRENT_ACTIVITY_NOT_FOUND)
            return
        }

        try {

            // Navigate to Post Inspector Activity.
            val intent = Intent(currentActivity, PoseInspectorActivity::class.java)
            intent.putExtra("exercises", exercises)
            currentActivity?.startActivityForResult(intent, REQUEST_CODE_POSE_INSPECTOR_ACTIVITY)

            // Navigate to Simulate Inspector Activity.
//            val intent = Intent(currentActivity, SimulateInspectorActivity::class.java)
//            intent.putExtra("plans", ExercisePlans(TEST_LIST_OF_EXERCISE_PLAN))
//            currentActivity?.startActivityForResult(intent, REQUEST_CODE_SIMULATE_INSPECTOR_ACTIVITY)

        } catch (exception: Exception) {
            Log.e(LOG_TAG, exception.message!!)
            this.failureCallback.invoke(ERROR_START_POSE_INSPECTOR_FAIL)
        }

    }

}