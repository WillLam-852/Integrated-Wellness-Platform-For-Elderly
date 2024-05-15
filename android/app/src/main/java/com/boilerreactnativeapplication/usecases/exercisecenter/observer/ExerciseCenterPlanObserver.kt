package com.boilerreactnativeapplication.usecases.exercisecenter.observer

import com.boilerreactnativeapplication.data.plan.ExercisePlan

interface ExerciseCenterPlanObserver {
    fun updateExerciseCenterPlan(plan: ExercisePlan, isFinished: Boolean)
}