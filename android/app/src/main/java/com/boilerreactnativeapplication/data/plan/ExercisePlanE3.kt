package com.boilerreactnativeapplication.data.plan

import com.boilerreactnativeapplication.data.plan.model.AbstractExercisePlan
import com.boilerreactnativeapplication.data.plan.model.ExerciseCode
import com.boilerreactnativeapplication.data.plan.model.ExerciseSide

class ExercisePlanE3 (
    code: ExerciseCode = ExerciseCode.E3,
    name: String = "雙手向上搖擺",
    side: ExerciseSide = ExerciseSide.BOTH,
    targetAmount: Int = 2
) : AbstractExercisePlan(
    code,
    name,
    side,
    targetAmount
) {

}