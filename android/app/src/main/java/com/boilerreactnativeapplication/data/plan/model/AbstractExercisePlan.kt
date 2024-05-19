package com.boilerreactnativeapplication.data.plan.model

import com.boilerreactnativeapplication.data.person.BodyPart
import com.boilerreactnativeapplication.data.person.KeyPoint
import com.boilerreactnativeapplication.data.person.Person
import java.io.Serializable

abstract class AbstractExercisePlan (
    val code: ExerciseCode = ExerciseCode.E0,
    val name: String = "undefined",
    val side: ExerciseSide = ExerciseSide.UNDEFINED,
    val targetAmount: Int = 0,
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

    abstract fun check(person: Person): List<Double>

}