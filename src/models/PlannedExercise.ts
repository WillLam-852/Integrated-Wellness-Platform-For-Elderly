class PlannedExercise {
    exerciseId: number
    planId: number
    target: number
    disabilityFactor: number

    constructor(
        exerciseId: number,
        planId: number,
        target: number,
        disabilityFactor: number
    ) {
        this.exerciseId = exerciseId
        this.planId = planId
        this.target = target
        this.disabilityFactor = disabilityFactor
    }
}

export default PlannedExercise
