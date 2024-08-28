package com.boilerreactnativeapplication.utils

import android.util.Size
import android.view.Surface

object SupportFunctions {

    /**
     * Method get the normalized coordinate by entering the coordinate of component in screen.
     *
     * @param coordinate [IntArray] is the coordinate of screen component.
     * @param screenSize [Size] is the size of the screen.
     * @return [DoubleArray] is the normalize coordinate of the screen component.
     * */
    fun getNormalizeCoordinate(coordinate: IntArray, screenSize: Size): DoubleArray? {
        return if(screenSize.width != 0 && screenSize.height != 0) {
            val normalizeCoordinate = DoubleArray(2)
            normalizeCoordinate[0] = coordinate[0].toDouble()/screenSize.width
            normalizeCoordinate[1] = coordinate[1].toDouble()/screenSize.height
            normalizeCoordinate
        }else {
            null
        }
    }

    /**
     * Method get the rotation parameter of current state.
     *
     * @param rotation [Int]
     * @return [Int]
     * */
    fun getRotationInPoseTracking(rotation: Int): Int {
        return when (rotation) {
            Surface.ROTATION_90 -> { Surface.ROTATION_270 }
            Surface.ROTATION_270 -> { Surface.ROTATION_90 }
            else -> { rotation }
        }
    }

}