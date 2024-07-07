package com.boilerreactnativeapplication.data.plan

import com.boilerreactnativeapplication.data.person.Person
import com.boilerreactnativeapplication.data.plan.model.AbstractExercisePlan
import com.boilerreactnativeapplication.data.plan.model.ExerciseCheckResult
import com.boilerreactnativeapplication.data.plan.model.ExerciseCode
import com.boilerreactnativeapplication.data.plan.model.ExerciseFeedback
import com.boilerreactnativeapplication.data.plan.model.ExerciseSide
import com.boilerreactnativeapplication.data.plan.model.ExerciseState
import com.boilerreactnativeapplication.utils.DataConverter

class ExercisePlanE1(
    code: ExerciseCode = ExerciseCode.E1,
    name: String = "雙手畫大圈",
    side: ExerciseSide = ExerciseSide.BOTH,
    targetAmount: Int = 5,
    feedbackList: List<ExerciseFeedback> = listOf<ExerciseFeedback>(
        ExerciseFeedback(
            Pair(0.0, 60.0),
            Pair(60.0, 100.0),
            Pair(100.0, 150.0),
            Pair(150.0, 180.0)
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
        val listOfTargetAngle: List<Double> = getListOfTargetAngle(person)
        val progressAndCountPair = updateState(listOfTargetAngle, availableCountExerciseState)
        return progressAndCountPair
    }

    override fun getDebugMsg(person: Person): String {
        val listOfTargetAngle: List<Double> = getListOfTargetAngle(person)
        return "listOfTargetAngle = left: ${"%.2f".format(listOfTargetAngle[0])}, right: ${"%.2f".format(listOfTargetAngle[1])}"
    }

    private fun getListOfTargetAngle(person:Person): List<Double> {
        leftShoulderKeyPoint = person.keyPoints[1]
        rightShoulderKeyPoint = person.keyPoints[2]
        leftElbowKeyPoint = person.keyPoints[3]
        rightElbowKeyPoint = person.keyPoints[4]
        leftHipKeyPoint = person.keyPoints[7]
        rightHipKeyPoint = person.keyPoints[8]

        val leftAngle: Double = DataConverter.convertPointsToAngle(leftElbowKeyPoint, leftShoulderKeyPoint, leftHipKeyPoint)
        val rightAngle: Double = DataConverter.convertPointsToAngle(rightElbowKeyPoint, rightShoulderKeyPoint, rightHipKeyPoint)
        return listOf<Double>(leftAngle, rightAngle)
    }

}