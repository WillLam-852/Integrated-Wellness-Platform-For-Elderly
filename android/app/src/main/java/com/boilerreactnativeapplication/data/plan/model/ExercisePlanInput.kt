package com.boilerreactnativeapplication.data.plan.model

import java.io.Serializable

data class ExercisePlanInput(
    val exerciseId: Int,
    val planId: Int,
    val target: Int,
    val disabilityFactor: Int
): Serializable