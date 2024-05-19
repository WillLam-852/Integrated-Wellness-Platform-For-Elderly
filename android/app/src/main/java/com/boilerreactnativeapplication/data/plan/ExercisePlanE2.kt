package com.boilerreactnativeapplication.data.plan

import com.boilerreactnativeapplication.data.person.Person
import com.boilerreactnativeapplication.data.plan.model.AbstractExercisePlan
import com.boilerreactnativeapplication.data.plan.model.ExerciseCode
import com.boilerreactnativeapplication.data.plan.model.ExerciseSide

class ExercisePlanE2 (
    code: ExerciseCode = ExerciseCode.E2,
    name: String = "軀幹轉動",
    side: ExerciseSide = ExerciseSide.BOTH,
    targetAmount: Int = 2
) : AbstractExercisePlan(
    code,
    name,
    side,
    targetAmount
) {

    override fun check(person: Person): List<Double> {
        TODO("Not yet implemented")
        return listOf<Double>()
    }

}