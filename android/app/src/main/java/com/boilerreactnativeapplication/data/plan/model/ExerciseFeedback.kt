package com.boilerreactnativeapplication.data.plan.model

import java.io.Serializable

data class ExerciseFeedback(
    val resetRange: Pair<Double, Double>,
    val levelOneRange: Pair<Double, Double>,
    val levelTwoRange: Pair<Double, Double>,
    val levelThreeRange: Pair<Double, Double>,
): Serializable
