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
    val feedbackList: List<ExerciseFeedback> = listOf<ExerciseFeedback>(
        ExerciseFeedback(Pair(0.0, 45.0), Pair(45.0, 90.0), Pair(90.0, 150.0), Pair(150.0, 180.0))
    )
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

    abstract fun getDebugMsg(person: Person): String

    // For most common case, we only focus on single feedback.
    open protected fun getNextState(angles: List<Double>): ExerciseState {
        return when {
            angles.all { it in feedbackList[0].resetRange.first..feedbackList[0].resetRange.second } -> ExerciseState.RESET
            angles.all { it in feedbackList[0].levelOneRange.first..feedbackList[0].levelOneRange.second } -> ExerciseState.LEVEL1
            angles.all { it in feedbackList[0].levelTwoRange.first..feedbackList[0].levelTwoRange.second } -> ExerciseState.LEVEL2
            angles.all { it in feedbackList[0].levelThreeRange.first..feedbackList[0].levelThreeRange.second } -> ExerciseState.LEVEL3
            else -> ExerciseState.ABNORMAL
        }
    }

    // For most common case, we only focus on single feedback.
    open protected fun getNextProgress(angles: List<Double>): Int {
        if (angles.isEmpty()) return 0
        val averageAngle = angles.average()
        return (((averageAngle / feedbackList[0].levelThreeRange.second) * 100).roundToInt())
    }

    protected fun updateState(angles: List<Double>): Pair<Int, Int> {
        val nextState = getNextState(angles)
        val currentProgress = getNextProgress(angles)
        var countToAdd = 0
        if(currentState != ExerciseState.RESET && nextState == ExerciseState.RESET) {
            countToAdd = 1
        }
        currentState = nextState
        return Pair(currentProgress, countToAdd)
    }

}