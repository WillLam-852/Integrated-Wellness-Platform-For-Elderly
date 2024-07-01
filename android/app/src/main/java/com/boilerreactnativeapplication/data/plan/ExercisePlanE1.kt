package com.boilerreactnativeapplication.data.plan

import com.boilerreactnativeapplication.data.person.Person
import com.boilerreactnativeapplication.data.plan.model.AbstractExercisePlan
import com.boilerreactnativeapplication.data.plan.model.ExerciseCode
import com.boilerreactnativeapplication.data.plan.model.ExerciseFeedback
import com.boilerreactnativeapplication.data.plan.model.ExerciseSide
import com.boilerreactnativeapplication.utils.DataConverter

class ExercisePlanE1(
    code: ExerciseCode = ExerciseCode.E1,
    name: String = "雙手畫大圈",
    side: ExerciseSide = ExerciseSide.BOTH,
    targetAmount: Int = 2,
    feedback: ExerciseFeedback = ExerciseFeedback(Pair(60.0, 100.0), Pair(100.0, 150.0), Pair(150.0, 180.0))
) : AbstractExercisePlan(
    code,
    name,
    side,
    targetAmount,
    feedback
) {

    override fun check(person: Person): Pair<Int, Int> {
        leftShoulderKeyPoint = person.keyPoints[1]
        rightShoulderKeyPoint = person.keyPoints[2]
        leftElbowKeyPoint = person.keyPoints[3]
        rightElbowKeyPoint = person.keyPoints[4]
        leftHipKeyPoint = person.keyPoints[7]
        rightHipKeyPoint = person.keyPoints[8]

        val leftAngle: Double = DataConverter.convertPointsToAngle(leftElbowKeyPoint, leftShoulderKeyPoint, leftHipKeyPoint)
        val rightAngle: Double = DataConverter.convertPointsToAngle(rightElbowKeyPoint, rightShoulderKeyPoint, rightHipKeyPoint)

        val progressAndCountPair = updateState(leftAngle)

        return progressAndCountPair
    }

}