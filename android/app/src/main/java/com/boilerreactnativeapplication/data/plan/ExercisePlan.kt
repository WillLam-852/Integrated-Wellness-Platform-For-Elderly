package com.boilerreactnativeapplication.data.plan

import java.io.Serializable

data class ExercisePlan (
    val id: Int,
    val exercise: String,
    val targetAmount: Int,
): Serializable