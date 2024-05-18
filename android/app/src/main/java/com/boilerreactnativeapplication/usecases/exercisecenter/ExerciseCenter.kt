package com.boilerreactnativeapplication.usecases.exercisecenter

import android.util.Log
import com.boilerreactnativeapplication.data.person.Person
import com.boilerreactnativeapplication.data.plan.ExercisePlan
import com.boilerreactnativeapplication.usecases.exercisecenter.observer.ExerciseCenterCountObserver
import com.boilerreactnativeapplication.usecases.exercisecenter.observer.ExerciseCenterPlanObserver
import com.boilerreactnativeapplication.usecases.exercisecenter.observer.ExerciseCenterProgressObserver
import com.boilerreactnativeapplication.usecases.exercisecenter.subject.ExerciseCenterSubject


class ExerciseCenter(private val planList: List<ExercisePlan>) : ExerciseCenterSubject {

    private val countObservers: MutableList<ExerciseCenterCountObserver> = mutableListOf()
    private val progressObservers: MutableList<ExerciseCenterProgressObserver> = mutableListOf()
    private val planObservers: MutableList<ExerciseCenterPlanObserver> = mutableListOf()

    private var count: Int = 0
    private var progress: Int = 0
    private var currentPlanIndex: Int = -1
    private var isFinished: Boolean = false


//------------------------------------- Update Function -------------------------------------------


    fun updatePerson(person: Person) {
        updateProgressByPlan()
    }

    private fun updateIncreasedProgress() {

    }

    private fun updateDecreasedProgress() {

    }

    private fun updateProgress(isMatchTargets: Boolean) {
        if(isMatchTargets) {
            updateIncreasedProgress()
        } else  {
            updateDecreasedProgress()
        }
    }

    private fun updateProgressByPlan() {

    }


//-------------------------------------  Observer Functions ----------------------------------------


    private fun countChanged() {
        notifyExerciseCenterCountObserver()
    }

    private fun progressChanged() {
        notifyExerciseCenterProgressObserver()
    }

    private fun planChanged() {
        notifyExerciseCenterPlanObserver()
    }

    private fun progressResetAndChanged() {
        progress = 0
        notifyExerciseCenterProgressObserver()
    }

    override fun notifyExerciseCenterCountObserver() {
        countObservers.forEach { observer ->
            observer.updateExerciseCenterCount(count)
        }
    }

    override fun notifyExerciseCenterProgressObserver() {
        progressObservers.forEach { observer ->
            observer.updateExerciseCenterProgress(progress)
        }
    }

    override fun notifyExerciseCenterPlanObserver() {
        if(currentPlanIndex != -1){
            planObservers.forEach { observer ->
                observer.updateExerciseCenterPlan(planList[currentPlanIndex], isFinished)
            }
        }
    }

    override fun registerExerciseCenterCountObserver(observer: ExerciseCenterCountObserver) {
        countObservers.add(observer)
    }

    override fun registerExerciseCenterProgressObserver(observer: ExerciseCenterProgressObserver) {
        progressObservers.add(observer)
    }

    override fun registerExerciseCenterPlanObserver(observer: ExerciseCenterPlanObserver) {
        planObservers.add(observer)
    }

    override fun removeExerciseCenterCountObserver(observer: ExerciseCenterCountObserver) {
        countObservers.remove(observer)
    }

    override fun removeExerciseCenterProgressObserver(observer: ExerciseCenterProgressObserver) {
        progressObservers.remove(observer)
    }

    override fun removeExerciseCenterPlanObserver(observer: ExerciseCenterPlanObserver) {
        planObservers.remove(observer)
    }

}