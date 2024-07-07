package com.boilerreactnativeapplication.data.plan

import com.boilerreactnativeapplication.data.person.Person
import com.boilerreactnativeapplication.data.person.Position
import com.boilerreactnativeapplication.data.plan.model.AbstractExercisePlan
import com.boilerreactnativeapplication.data.plan.model.ExerciseCheckResult
import com.boilerreactnativeapplication.data.plan.model.ExerciseCode
import com.boilerreactnativeapplication.data.plan.model.ExerciseFeedback
import com.boilerreactnativeapplication.data.plan.model.ExerciseSide
import com.boilerreactnativeapplication.data.plan.model.ExerciseState
import com.boilerreactnativeapplication.utils.DataConverter
import kotlin.math.abs

class ExercisePlanE2 (
    code: ExerciseCode = ExerciseCode.E2,
    name: String = "軀幹轉動",
    side: ExerciseSide = ExerciseSide.BOTH,
    targetAmount: Int = 5,
    feedbackList: List<ExerciseFeedback> = listOf<ExerciseFeedback>(
        ExerciseFeedback(
            Pair(0.0, 10.0),
            Pair(10.0, 13.0),
            Pair(13.0, 16.0),
            Pair(16.0, 25.0)
        )
    )
) : AbstractExercisePlan(
    code,
    name,
    side,
    targetAmount,
    feedbackList
) {

    override fun check(person: Person, availableCountExerciseState: ExerciseState?): ExerciseCheckResult {
        val angleDifference = getDifferenceOfTargetAngles(person)
        val progressAndCountPair = updateState(listOf(angleDifference), availableCountExerciseState)
        return progressAndCountPair
    }

    override fun getDebugMsg(person: Person): String {
        val angleDifference = getDifferenceOfTargetAngles(person)
        return "AngleDifference = ${"%.2f".format(angleDifference)}"
    }

    private fun getDifferenceOfTargetAngles(
        person: Person
    ): Double {
        leftShoulderKeyPoint = person.keyPoints[1]
        rightShoulderKeyPoint = person.keyPoints[2]
        leftHipKeyPoint = person.keyPoints[7]
        rightHipKeyPoint = person.keyPoints[8]
        val shoulderMidPoint: Position =
            DataConverter.getMidPoint(leftShoulderKeyPoint.position, rightShoulderKeyPoint.position)
        val hipMidPoint: Position =
            DataConverter.getMidPoint(leftHipKeyPoint.position, rightHipKeyPoint.position)
        val midHipMidShoulderRightShoulderAngle: Double = DataConverter.convertPositionToAngle(
            hipMidPoint,
            shoulderMidPoint,
            rightShoulderKeyPoint.position
        )
        val midHipMidShoulderLeftShoulderAngle: Double = DataConverter.convertPositionToAngle(
            hipMidPoint,
            shoulderMidPoint,
            leftShoulderKeyPoint.position
        )
        return abs(midHipMidShoulderRightShoulderAngle - midHipMidShoulderLeftShoulderAngle)
    }

}