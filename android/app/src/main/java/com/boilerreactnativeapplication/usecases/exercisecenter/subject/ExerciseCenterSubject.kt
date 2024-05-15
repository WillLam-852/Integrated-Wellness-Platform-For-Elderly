package com.boilerreactnativeapplication.usecases.exercisecenter.subject

import com.boilerreactnativeapplication.usecases.exercisecenter.observer.*

interface ExerciseCenterSubject {

    // Notify all game center observer.
    fun notifyExerciseCenterCountObserver()
    fun notifyExerciseCenterProgressObserver()
    fun notifyExerciseCenterPlanObserver()

    // Register a exercise center observer to receive change.
    fun registerExerciseCenterCountObserver(observer: ExerciseCenterCountObserver)
    fun registerExerciseCenterProgressObserver(observer: ExerciseCenterProgressObserver)
    fun registerExerciseCenterPlanObserver(observer: ExerciseCenterPlanObserver)

    // Remove a game center observer to receive change.
    fun removeExerciseCenterCountObserver(observer: ExerciseCenterCountObserver)
    fun removeExerciseCenterProgressObserver(observer: ExerciseCenterProgressObserver)
    fun removeExerciseCenterPlanObserver(observer: ExerciseCenterPlanObserver)

}