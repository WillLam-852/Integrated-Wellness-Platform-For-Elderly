package com.boilerreactnativeapplication.data.plan.model

import com.boilerreactnativeapplication.data.person.BodyPart
import com.boilerreactnativeapplication.data.person.KeyPoint
import com.boilerreactnativeapplication.data.person.Person
import java.io.Serializable
import kotlin.math.roundToInt

abstract class AbstractExercisePlan (
    val code: ExerciseCode = ExerciseCode.E0,
    val name: String = "undefined",
    val side: ExerciseSide = ExerciseSide.UNDEFINED,
    val targetAmount: Int = 0,
    val feedback: ExerciseFeedback = ExerciseFeedback(Pair(45.0, 90.0), Pair(90.0, 150.0), Pair(150.0, 180.0))
): Serializable {

    protected var headKeyPoint: KeyPoint = KeyPoint(bodyPart = BodyPart.HEAD)
    protected var leftShoulderKeyPoint: KeyPoint = KeyPoint(bodyPart = BodyPart.LEFT_SHOULDER)
    protected var rightShoulderKeyPoint: KeyPoint = KeyPoint(bodyPart = BodyPart.RIGHT_SHOULDER)
    protected var leftElbowKeyPoint: KeyPoint = KeyPoint(bodyPart = BodyPart.LEFT_ELBOW)
    protected var rightElbowKeyPoint: KeyPoint = KeyPoint(bodyPart = BodyPart.RIGHT_ELBOW)
    protected var leftWristKeyPoint: KeyPoint = KeyPoint(bodyPart = BodyPart.LEFT_WRIST)
    protected var rightWristKeyPoint: KeyPoint = KeyPoint(bodyPart = BodyPart.RIGHT_WRIST)
    protected var leftHipKeyPoint: KeyPoint = KeyPoint(bodyPart = BodyPart.LEFT_HIP)
    protected var rightHipKeyPoint: KeyPoint = KeyPoint(bodyPart = BodyPart.RIGHT_HIP)
    protected var leftKneeKeyPoint: KeyPoint = KeyPoint(bodyPart = BodyPart.LEFT_KNEE)
    protected var rightKneeKeyPoint: KeyPoint = KeyPoint(bodyPart = BodyPart.RIGHT_KNEE)
    protected var leftAnkleKeyPoint: KeyPoint = KeyPoint(bodyPart = BodyPart.LEFT_ANKLE)
    protected var rightAnkleKeyPoint: KeyPoint = KeyPoint(bodyPart = BodyPart.RIGHT_ANKLE)

    protected var currentState: ExerciseState = ExerciseState.RESET

    abstract fun check(person: Person): Pair<Int, Int>

    protected fun getNextState(angle: Double): ExerciseState {
        return when (angle) {
            in feedback.levelOneRange.first..feedback.levelOneRange.second -> ExerciseState.LEVEL1
            in feedback.leveTwoRange.first..feedback.leveTwoRange.second -> ExerciseState.LEVEL2
            in feedback.leveThreeRange.first..feedback.leveThreeRange.second -> ExerciseState.LEVEL3
            else -> ExerciseState.RESET
        }
    }

    private fun getNextProgress(angle: Double): Int {
        return (((angle/180.0)*100).roundToInt())
    }

    protected fun updateState(angle: Double): Pair<Int, Int> {
        val nextState = getNextState(angle)
        val currentProgress = getNextProgress(angle)
        var countToAdd = 0
        if(currentState != ExerciseState.RESET && nextState == ExerciseState.RESET) {
            countToAdd = 1
        }
        currentState = nextState
        return Pair(currentProgress, countToAdd)
    }

}