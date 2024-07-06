package com.boilerreactnativeapplication.data.plan

import android.util.Log
import com.boilerreactnativeapplication.data.person.Person
import com.boilerreactnativeapplication.data.plan.model.AbstractExercisePlan
import com.boilerreactnativeapplication.data.plan.model.ExerciseCode
import com.boilerreactnativeapplication.data.plan.model.ExerciseFeedback
import com.boilerreactnativeapplication.data.plan.model.ExerciseSide
import com.boilerreactnativeapplication.data.plan.model.ExerciseState
import com.boilerreactnativeapplication.utils.DataConverter

class ExercisePlanE3 (
    code: ExerciseCode = ExerciseCode.E3,
    name: String = "雙手向上搖擺",
    side: ExerciseSide = ExerciseSide.BOTH,
    targetAmount: Int = 5,
    feedbackList: List<ExerciseFeedback> = listOf<ExerciseFeedback>(
        ExerciseFeedback(Pair(100.0, 150.0), Pair(150.0, 160.0), Pair(160.0, 170.0), Pair(170.0, 180.0)),
        ExerciseFeedback(Pair(100.0, 150.0), Pair(100.0, 80.0), Pair(60.0, 80.0), Pair(0.0, 60.0))
    )
) : AbstractExercisePlan(
    code,
    name,
    side,
    targetAmount,
    feedbackList
) {

    override fun getNextState(angles: List<Double>): ExerciseState {
        feedbackList.forEach { feedback ->
            if (angles.all { it in feedback.resetRange.first..feedback.resetRange.second }) {
                return ExerciseState.RESET
            }
            if (angles.all { it in feedback.levelOneRange.first..feedback.levelOneRange.second }) {
                return ExerciseState.LEVEL1
            }
            if (angles.all { it in feedback.levelTwoRange.first..feedback.levelTwoRange.second }) {
                return ExerciseState.LEVEL2
            }
            if (angles.all { it in feedback.levelThreeRange.first..feedback.levelThreeRange.second }) {
                return ExerciseState.LEVEL3
            }
        }
        return ExerciseState.ABNORMAL
    }

    override fun getNextProgress(angles: List<Double>): Int {
        return super.getNextProgress(angles)
    }

    override fun check(person: Person): Pair<Int, Int> {
        leftShoulderKeyPoint = person.keyPoints[1]
        rightShoulderKeyPoint = person.keyPoints[2]
        leftElbowKeyPoint = person.keyPoints[3]
        rightElbowKeyPoint = person.keyPoints[4]
        leftWristKeyPoint = person.keyPoints[5]
        rightWristKeyPoint = person.keyPoints[6]

        val leftElbowAngle: Double = DataConverter.convertPointsToAngle(leftShoulderKeyPoint, leftElbowKeyPoint, leftWristKeyPoint)
        val rightElbowAngle: Double = DataConverter.convertPointsToAngle(rightShoulderKeyPoint, rightElbowKeyPoint, rightWristKeyPoint)

        return if(leftElbowAngle > rightElbowAngle) {
            updateState(listOf(leftElbowAngle, rightElbowAngle))
        } else {
            updateState(listOf(rightElbowAngle, leftElbowAngle))
        }
    }

    override fun getDebugMsg(person: Person): String {
        leftShoulderKeyPoint = person.keyPoints[1]
        rightShoulderKeyPoint = person.keyPoints[2]
        leftElbowKeyPoint = person.keyPoints[3]
        rightElbowKeyPoint = person.keyPoints[4]
        leftWristKeyPoint = person.keyPoints[5]
        rightWristKeyPoint = person.keyPoints[6]
        leftHipKeyPoint = person.keyPoints[7]
        rightHipKeyPoint = person.keyPoints[8]

        val leftElbowAngle: Double = DataConverter.convertPointsToAngle(leftShoulderKeyPoint, leftElbowKeyPoint, leftWristKeyPoint)
        val rightElbowAngle: Double = DataConverter.convertPointsToAngle(rightShoulderKeyPoint, rightElbowKeyPoint, rightWristKeyPoint)
        val leftShoulderAngle: Double = DataConverter.convertPointsToAngle(leftElbowKeyPoint, leftShoulderKeyPoint, leftHipKeyPoint)
        val rightShoulderAngle: Double = DataConverter.convertPointsToAngle(rightElbowKeyPoint, rightShoulderKeyPoint, rightHipKeyPoint)

//        val deBugMsg =
//                "leftElbowAngle = ${"%.2f".format(leftElbowAngle)},\n " +
//                "rightElbowAngle = ${"%.2f".format(rightElbowAngle)},\n" +
//                "leftShoulderAngle = ${"%.2f".format(leftShoulderAngle)},\n" +
//                "rightShoulderAngle = ${"%.2f".format(rightShoulderAngle)}";
//        Log.i("Angle Check:", deBugMsg)
        val debugMsg = "is both elbow on reset range: ${isBothHandsOnResetRange(listOf( leftElbowAngle, rightElbowAngle))}"
        return debugMsg
    }

    private fun isBothHandsOnResetRange(angles: List<Double>): Boolean {
        val isLeftElbowInResetRange = angles[0] in feedbackList[0].resetRange.first..feedbackList[0].resetRange.second
        val isRightElbowInResetRange = angles[1] in feedbackList[1].resetRange.first..feedbackList[1].resetRange.second
        return isLeftElbowInResetRange && isRightElbowInResetRange
    }

}