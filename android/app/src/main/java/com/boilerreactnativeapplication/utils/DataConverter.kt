package com.boilerreactnativeapplication.utils

import com.boilerreactnativeapplication.data.person.BodyPart
import com.boilerreactnativeapplication.data.person.*
import com.boilerreactnativeapplication.data.plan.model.AbstractExercisePlan
import com.google.mediapipe.formats.proto.LandmarkProto

object DataConverter {

    fun convertRawReactDataToExercisePlan(): AbstractExercisePlan? {
        return null
    }

    fun convertLandmarkToPerson(landmarkList: List<LandmarkProto.NormalizedLandmark>): Person {
        val person = Person()
        enumValues<BodyPart>().forEach {
            val index = it.indexInBlazePose
            val landmarkPoint = landmarkList[index]
            val position = Position(landmarkPoint.x, landmarkPoint.y)
            val keyPoint = KeyPoint(it, position, landmarkPoint.visibility)
            person.keyPoints[it.indexInPerson] = keyPoint
        }
        return person
    }

}