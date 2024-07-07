package com.boilerreactnativeapplication.data.plan.model

data class ExerciseCheckResult (
    val progress: Int,
    val countToAdd: Int,
    val countExerciseState: ExerciseState?
)