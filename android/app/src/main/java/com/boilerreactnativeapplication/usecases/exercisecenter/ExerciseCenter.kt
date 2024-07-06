package com.boilerreactnativeapplication.usecases.exercisecenter

import android.util.Log
import com.boilerreactnativeapplication.data.person.Person
import com.boilerreactnativeapplication.data.plan.model.AbstractExercisePlan
import com.boilerreactnativeapplication.data.plan.model.ExercisePlans
import com.boilerreactnativeapplication.usecases.exercisecenter.observer.ExerciseCenterCountObserver
import com.boilerreactnativeapplication.usecases.exercisecenter.observer.ExerciseCenterDebugMsgObserver
import com.boilerreactnativeapplication.usecases.exercisecenter.observer.ExerciseCenterPlanObserver
import com.boilerreactnativeapplication.usecases.exercisecenter.observer.ExerciseCenterProgressObserver
import com.boilerreactnativeapplication.usecases.exercisecenter.subject.ExerciseCenterSubject
import kotlin.time.Duration.Companion.seconds


class ExerciseCenter(private val plans: ExercisePlans?) : ExerciseCenterSubject {

    companion object {
        private const val LOG_TAG: String = "ExerciseCenter"
    }

    private val countObservers: MutableList<ExerciseCenterCountObserver> = mutableListOf()
    private val progressObservers: MutableList<ExerciseCenterProgressObserver> = mutableListOf()
    private val planObservers: MutableList<ExerciseCenterPlanObserver> = mutableListOf()
    private val debugMsgObservers: MutableList<ExerciseCenterDebugMsgObserver> = mutableListOf()

    private var count: Int = 0
    private var progress: Int = 0
    private var currentPlanIndex: Int = -1
    private var isFinished: Boolean = false
    private var debugMsg: String = ""


//------------------------------------- Initialization ---------------------------------------------


    fun initPlan() {
        if(currentPlanIndex == -1) {
            currentPlanIndex = 0
        }
        planChanged()
    }


//------------------------------------- Update Function --------------------------------------------


    //TODO: Comment the debugMsg assign and the change notification when debug function disable.
    fun updatePerson(person: Person) {
        plans?.let {
            val result = it.list[currentPlanIndex].check(person)
            val currentProgress: Int = result.first
            val countToAdd: Int = result.second
            count += countToAdd
            progress = currentProgress
            //debugMsg = it.list[currentPlanIndex].getDebugMsg(person)
            progressChanged()
            countChanged()
            //debugMsgChanged()
        }?: Log.e(LOG_TAG, "Plans is not initialized")
    }

    private fun updateIncreasedProgress() {
        progress += 25
        if(progress >= 100) {
            count += 1
            progressResetAndChanged()
            if(count >= plans!!.list[currentPlanIndex].targetAmount) {
                currentPlanIndex += 1
                planChanged()
            }
            countChanged()
        }
        progressChanged()
    }

    private fun updateDecreasedProgress() {
        if(progress > 0) {
            progress -= 25
            progressChanged()
        }
    }

    fun updateProgress(isMatchTargets: Boolean) {
        if(isMatchTargets) {
            updateIncreasedProgress()
        } else  {
            updateDecreasedProgress()
        }
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

    private fun debugMsgChanged() {
        notifyExerciseCenterDebugMsgObserver()
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
        plans?.let {
            var currentPlan: AbstractExercisePlan? = null
            if(currentPlanIndex != -1 && currentPlanIndex < it.list.size){
                currentPlan = it.list[currentPlanIndex]
            } else if (currentPlanIndex == it.list.size) {
                isFinished = true
            }
            planObservers.forEach { observer ->
                observer.updateExerciseCenterPlan(currentPlan, isFinished)
            }
        }
    }

    override fun notifyExerciseCenterDebugMsgObserver() {
        debugMsgObservers.forEach { observer ->
            observer.updateExerciseCenterDebugMsg(debugMsg)
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

    override fun registerExerciseCenterDebugMsgObserver(observer: ExerciseCenterDebugMsgObserver) {
        debugMsgObservers.add(observer)
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

    override fun removeExerciseCenterDebugMsgObserver(observer: ExerciseCenterDebugMsgObserver) {
        debugMsgObservers.remove(observer)
    }

//------------------------------------- Condition Handling -----------------------------------------





}