import { HealthValue } from "react-native-health"

const now = new Date()
const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
)

const oneYearAgo = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
)

export const nowString = now.toISOString()
export const twentyFourHoursAgoString = twentyFourHoursAgo.toISOString()
export const oneMonthAgoString = oneMonthAgo.toISOString()
export const oneYearAgoString = oneYearAgo.toISOString()

export const getSum = (items: Array<number>): number => {
    const sum = items.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )
    return sum
}

export const getAverage = (items: Array<number>): number => {
    const sum = getSum(items)
    const average = sum / items.length
    return average
}

export const getSleepAnalysis = (items: Array<any>): number => {
    let sleepHours = 0
    for (const item of items) {
        if (item.value == "INBED") {
            const startTime = new Date(item.startDate)
            const endTime = new Date(item.endDate)
            const duration =
                (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
            sleepHours += duration
        }
    }
    return sleepHours
}
