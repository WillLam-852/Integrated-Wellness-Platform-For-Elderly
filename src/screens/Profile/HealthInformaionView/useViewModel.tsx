import { StyleSheet } from "react-native"
import healthInformationSelector from "@/redux/health-information/selector"
import { useSelector } from "react-redux"

const useViewModel = () => {
    const {
        height,
        weight,
        averageHeartRate,
        activeEnergyBurned,
        water,
        carbohydrates,
        bodyFatPercentage,
        diastolicBloodPressure,
        systolicBloodPressure,
        sleep,
    } = useSelector(healthInformationSelector)

    const styles = StyleSheet.create({
        root: {},
    })

    return {
        height,
        weight,
        averageHeartRate,
        activeEnergyBurned,
        water,
        carbohydrates,
        bodyFatPercentage,
        diastolicBloodPressure,
        systolicBloodPressure,
        sleep,
        styles,
    }
}

export default useViewModel
