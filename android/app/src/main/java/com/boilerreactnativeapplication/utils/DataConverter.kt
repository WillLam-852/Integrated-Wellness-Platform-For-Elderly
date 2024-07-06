package com.boilerreactnativeapplication.utils

import android.util.Log
import com.boilerreactnativeapplication.data.person.BodyPart
import com.boilerreactnativeapplication.data.person.*
import com.boilerreactnativeapplication.data.plan.model.AbstractExercisePlan
import com.google.mediapipe.formats.proto.LandmarkProto
import kotlin.math.sqrt
import kotlin.math.acos

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

    fun convertPointsToAngle(firstSidePoint: KeyPoint, centerPoint: KeyPoint, secondSidePoint: KeyPoint): Double {
        Log.i("DataConverter", firstSidePoint.toString())
        Log.i("DataConverter", centerPoint.toString())
        Log.i("DataConverter", secondSidePoint.toString())

        val distanceXFirstSidePointToCenter = firstSidePoint.position.x - centerPoint.position.x
        val distanceYFirstSidePointToCenter = firstSidePoint.position.y - centerPoint.position.y
        val distanceXSecondSidePointToCenter = secondSidePoint.position.x - centerPoint.position.x
        val distanceYSecondSidePointToCenter = secondSidePoint.position.y - centerPoint.position.y

        // Calculate dot product of BA and BC
        val dotProduct = distanceXFirstSidePointToCenter * distanceXSecondSidePointToCenter + distanceYFirstSidePointToCenter * distanceYSecondSidePointToCenter

        // Calculate magnitudes of BA and BC
        val magnitudeBA = sqrt(distanceXFirstSidePointToCenter * distanceXFirstSidePointToCenter + distanceYFirstSidePointToCenter * distanceYFirstSidePointToCenter)
        val magnitudeBC = sqrt(distanceXSecondSidePointToCenter * distanceXSecondSidePointToCenter + distanceYSecondSidePointToCenter * distanceYSecondSidePointToCenter)

        // Calculate the cosine of the angle
        val cosTheta = dotProduct / (magnitudeBA * magnitudeBC)

        // Calculate the angle in radians
        val angleInRadians = acos(cosTheta)

        // Convert the angle to degrees
        return Math.toDegrees(angleInRadians.toDouble())
    }

    fun convertPositionToAngle(firstSidePosition: Position, centerPosition: Position, secondSidePosition: Position): Double {
        val distanceXFirstSidePointToCenter = firstSidePosition.x - centerPosition.x
        val distanceYFirstSidePointToCenter = firstSidePosition.y - centerPosition.y
        val distanceXSecondSidePointToCenter = secondSidePosition.x - centerPosition.x
        val distanceYSecondSidePointToCenter = secondSidePosition.y - centerPosition.y

        // Calculate dot product of BA and BC
        val dotProduct = distanceXFirstSidePointToCenter * distanceXSecondSidePointToCenter + distanceYFirstSidePointToCenter * distanceYSecondSidePointToCenter

        // Calculate magnitudes of BA and BC
        val magnitudeBA = sqrt(distanceXFirstSidePointToCenter * distanceXFirstSidePointToCenter + distanceYFirstSidePointToCenter * distanceYFirstSidePointToCenter)
        val magnitudeBC = sqrt(distanceXSecondSidePointToCenter * distanceXSecondSidePointToCenter + distanceYSecondSidePointToCenter * distanceYSecondSidePointToCenter)

        // Calculate the cosine of the angle
        val cosTheta = dotProduct / (magnitudeBA * magnitudeBC)

        // Calculate the angle in radians
        val angleInRadians = acos(cosTheta)

        // Convert the angle to degrees
        return Math.toDegrees(angleInRadians.toDouble())
    }

    fun getMidPoint(p1: Position, p2: Position): Position {
        val midX = (p1.x + p2.x) / 2
        val midY = (p1.y + p2.y) / 2
        return Position(midX, midY)
    }
}