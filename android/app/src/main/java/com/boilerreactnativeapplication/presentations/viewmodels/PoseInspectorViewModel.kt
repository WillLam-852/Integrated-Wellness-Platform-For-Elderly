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
import com.boilerreactnativeapplication.utils.CAMERA_FACING_BACK
import com.boilerreactnativeapplication.utils.CAMERA_FACING_FRONT
import com.boilerreactnativeapplication.utils.SupportFunctions
import com.google.mediapipe.components.CameraHelper
import kotlinx.coroutines.launch

class PoseInspectorViewModel(application: Application): AndroidViewModel(application) {

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


//------------------------------------- Live Data Part ---------------------------------------------


    private var _person = MutableLiveData<Person>()
    val person: LiveData<Person>
        get() = _person

    private var _headPosition = MutableLiveData<Position>()
    val headPosition: LiveData<Position>
        get() = _headPosition


//------------------------------------- Data Update Functions --------------------------------------


    fun updatePerson(person: Person) {
        _person.postValue(person)
        _headPosition.postValue(person.keyPoints[0].position)
//        Log.i(LOG_TAG, person.toString())
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

}