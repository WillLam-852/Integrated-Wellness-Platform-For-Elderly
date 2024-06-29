package com.boilerreactnativeapplication.usecases.exercisecenter.observer

import com.boilerreactnativeapplication.data.plan.model.AbstractExercisePlan

interface ExerciseCenterPlanObserver {
    fun updateExerciseCenterPlan(plan: AbstractExercisePlan?, isFinished: Boolean)
}