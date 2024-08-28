import AppleHealthKit, {
    BloodPressureSampleValue,
    HealthValue,
} from "react-native-health"
import {
    getAverage,
    getSleepAnalysis,
    getSum,
    nowString,
    oneMonthAgoString,
    oneYearAgoString,
    twentyFourHoursAgoString,
} from "./helperFunction"
import {
    updateActiveEnergyBurned,
    updateAverageHeartRate,
    updateBodyFatPercentage,
    updateCarbohydrates,
    updateDiastolicBloodPressure,
    updateHeight,
    updateSleep,
    updateSystolicBloodPressure,
    updateWater,
    updateWeight,
} from "@/redux/health-information/slice"

import { Dispatch } from "redux"

export const fetchAllFromHealthKit = (dispatch: Dispatch<any>) => {
    AppleHealthKit.getLatestHeight(
        { unit: "meter" },
        (err: string, results: HealthValue) => {
            if (err) {
                console.log("error getting latest height: ", err)
                return
            }
            dispatch(updateHeight(results.value))
        }
    )

    AppleHealthKit.getLatestWeight(
        { unit: "gram" },
        (err: string, results: HealthValue) => {
            if (err) {
                console.log("error getting latest weight: ", err)
                return
            }
            dispatch(updateWeight(results.value / 1000))
        }
    )

    AppleHealthKit.getHeartRateSamples(
        {
            startDate: twentyFourHoursAgoString,
            endDate: nowString,
        },
        (err: string, results: Array<HealthValue>) => {
            if (err) {
                console.log("error getting heart rate samples: ", err)
                return
            }
            if (results.length == 0) return

            const heartRates = results.map((item) => item.value)
            dispatch(updateAverageHeartRate(getAverage(heartRates)))
        }
    )

    AppleHealthKit.getActiveEnergyBurned(
        {
            startDate: twentyFourHoursAgoString,
            endDate: nowString,
        },
        (err: string, results: Array<HealthValue>) => {
            if (err) {
                console.log("error getting activity energy burned: ", err)
                return
            }
            if (results.length == 0) return
            const activeEnergies = results.map((item) => item.value)
            dispatch(updateActiveEnergyBurned(getSum(activeEnergies)))
        }
    )

    AppleHealthKit.getWaterSamples(
        {
            startDate: twentyFourHoursAgoString,
            endDate: nowString,
        },
        (err: string, results: Array<HealthValue>) => {
            if (err) {
                console.log("error getting water samples: ", err)
                return
            }
            if (results.length == 0) return
            const waterSamples = results.map((item) => item.value)
            dispatch(updateWater(getSum(waterSamples)))
        }
    )

    AppleHealthKit.getCarbohydratesSamples(
        {
            startDate: twentyFourHoursAgoString,
            endDate: nowString,
        },
        (err: string, results: Array<HealthValue>) => {
            if (err) {
                console.log("error getting carbohydrate samples: ", err)
                return
            }
            if (results.length == 0) return
            const carbohydrateSamples = results.map((item) => item.value)
            dispatch(updateCarbohydrates(getSum(carbohydrateSamples)))
        }
    )

    AppleHealthKit.getLatestBodyFatPercentage(
        {},
        (err: string, results: HealthValue) => {
            if (err) {
                console.log("error getting latest body fat percentage: ", err)
                return
            }
            dispatch(updateBodyFatPercentage(results.value))
        }
    )

    AppleHealthKit.getBloodPressureSamples(
        {
            startDate: oneMonthAgoString,
            endDate: nowString,
        },
        (err: string, results: Array<BloodPressureSampleValue>) => {
            if (err) {
                console.log("error getting blood pressure samples: ", err)
                return
            }
            if (results.length == 0) return
            const systolicbloodPressureSamples = results.map(
                (item) => item.bloodPressureSystolicValue
            )
            const diastolicbloodPressureSamples = results.map(
                (item) => item.bloodPressureDiastolicValue
            )
            dispatch(
                updateSystolicBloodPressure(
                    getAverage(systolicbloodPressureSamples)
                )
            )
            dispatch(
                updateDiastolicBloodPressure(
                    getAverage(diastolicbloodPressureSamples)
                )
            )
        }
    )

    AppleHealthKit.getSleepSamples(
        {
            startDate: twentyFourHoursAgoString,
            endDate: nowString,
        },
        (err: string, results: Array<HealthValue>) => {
            if (err) {
                console.log("error getting sleep samples: ", err)
                return
            }
            if (results.length == 0) return
            const sleepAnalysis = getSleepAnalysis(results)
            dispatch(updateSleep(sleepAnalysis))
        }
    )
}
