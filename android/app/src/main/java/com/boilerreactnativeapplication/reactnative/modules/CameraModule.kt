package com.boilerreactnativeapplication.reactnative.modules

import android.util.Log
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CameraModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val LOG_TAG: String = "CameraModule"
        const val MODULE_NAME: String = "CameraModule"
    }

    override fun getName(): String {
        return MODULE_NAME
    }

    @ReactMethod
    fun createCallbackEvent(
        name: String,
        location: String,
        failureCallback: Callback,
        successCallback: Callback
    ) {
        val callbackDataId: Int = 16
        Log.d(LOG_TAG, "Create callback event called with name: $name and location $location")
        successCallback.invoke(callbackDataId)
    }

}