import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface HealthInformationState {
    height?: number // Latest
    weight?: number // Latest
    averageHeartRate?: number // Last 24 hours
    activeEnergyBurned?: number // Last 24 hours
    water?: number // Last 24 hours
    carbohydrates?: number // Last 24 hours
    bodyFatPercentage?: number // Latest
    diastolicBloodPressure?: number // Last month
    systolicBloodPressure?: number // Last month
    sleep?: number // Last 24 hours
}

const initialState: HealthInformationState = {}

const roundToTwoDP = (number: number): number => {
    const factor = Math.pow(10, 2)
    const roundedNumber = Math.round(number * factor) / factor
    return roundedNumber
}

const healthInformationSlice = createSlice({
    name: "healthInformation",
    initialState,
    reducers: {
        updateHeight: (state, action: PayloadAction<number>) => {
            state.height = roundToTwoDP(action.payload)
        },
        updateWeight: (state, action: PayloadAction<number>) => {
            state.weight = roundToTwoDP(action.payload)
        },
        updateAverageHeartRate: (state, action: PayloadAction<number>) => {
            state.averageHeartRate = roundToTwoDP(action.payload)
        },
        updateActiveEnergyBurned: (state, action: PayloadAction<number>) => {
            state.activeEnergyBurned = roundToTwoDP(action.payload)
        },
        updateWater: (state, action: PayloadAction<number>) => {
            state.water = roundToTwoDP(action.payload)
        },
        updateCarbohydrates: (state, action: PayloadAction<number>) => {
            state.carbohydrates = roundToTwoDP(action.payload)
        },
        updateBodyFatPercentage: (state, action: PayloadAction<number>) => {
            state.bodyFatPercentage = roundToTwoDP(action.payload)
        },
        updateDiastolicBloodPressure: (
            state,
            action: PayloadAction<number>
        ) => {
            state.diastolicBloodPressure = roundToTwoDP(action.payload)
        },
        updateSystolicBloodPressure: (state, action: PayloadAction<number>) => {
            state.systolicBloodPressure = roundToTwoDP(action.payload)
        },
        updateSleep: (state, action: PayloadAction<number>) => {
            state.sleep = roundToTwoDP(action.payload)
        },
    },
})

export const {
    updateHeight,
    updateWeight,
    updateAverageHeartRate,
    updateActiveEnergyBurned,
    updateWater,
    updateCarbohydrates,
    updateBodyFatPercentage,
    updateDiastolicBloodPressure,
    updateSystolicBloodPressure,
    updateSleep,
} = healthInformationSlice.actions

export default healthInformationSlice.reducer
