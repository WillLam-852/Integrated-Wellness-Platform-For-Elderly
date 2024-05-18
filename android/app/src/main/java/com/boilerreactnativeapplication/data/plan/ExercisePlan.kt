package com.boilerreactnativeapplication.data.plan

import java.io.Serializable

data class ExercisePlan (
    val id: Int,
    val name: String,
    val side: ExerciseSide,
    val targetAmount: Int,
): Serializable