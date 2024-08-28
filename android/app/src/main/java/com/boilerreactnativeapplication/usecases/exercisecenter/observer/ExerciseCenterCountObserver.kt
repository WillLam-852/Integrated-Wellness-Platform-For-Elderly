package com.boilerreactnativeapplication.usecases.exercisecenter.observer

import com.boilerreactnativeapplication.data.plan.model.ExerciseState

interface ExerciseCenterCountObserver {
    fun updateExerciseCenterCount(count: Int, countExerciseState: ExerciseState?)
}