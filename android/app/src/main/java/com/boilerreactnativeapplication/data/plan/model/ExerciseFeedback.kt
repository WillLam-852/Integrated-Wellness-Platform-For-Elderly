package com.boilerreactnativeapplication.data.plan.model

data class ExerciseFeedback(
    val resetRange: Pair<Double, Double>,
    val levelOneRange: Pair<Double, Double>,
    val levelTwoRange: Pair<Double, Double>,
    val levelThreeRange: Pair<Double, Double>,
)
