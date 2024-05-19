package com.boilerreactnativeapplication.data.plan.model

import java.io.Serializable

abstract class AbstractExercisePlan (
    val code: ExerciseCode = ExerciseCode.E0,
    val name: String = "undefined",
    val side: ExerciseSide = ExerciseSide.UNDEFINED,
    val targetAmount: Int = 0,
): Serializable {

}