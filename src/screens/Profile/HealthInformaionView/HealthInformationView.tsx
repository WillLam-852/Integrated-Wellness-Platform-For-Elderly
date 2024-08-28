import HealthValueView from "./HealthValueView/HealthValueView"
import React from "react"
import { View } from "react-native"
import useViewModel from "./useViewModel"

const HealthInformationView = () => {
    const viewModel = useViewModel()
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
        styles,
    } = viewModel

    return (
        <View style={styles.root}>
            <HealthValueView
                title={"Height"}
                value={height}
                unit={"m"}
                titleColor={"blue"}
                iconName={"height"}
            />
            <HealthValueView
                title={"Weight"}
                value={weight}
                unit={"kg"}
                titleColor={"blue"}
                iconName={"monitor-weight"}
            />
            <HealthValueView
                title={"Average Heart Rate"}
                description={"Last 24 hours"}
                value={averageHeartRate}
                unit={"bpm"}
                titleColor={"red"}
                iconName={"monitor-heart"}
            />
            <HealthValueView
                title={"Active Energy Burned"}
                description={"Last 24 hours"}
                value={activeEnergyBurned}
                unit={"kcal"}
                titleColor={"red"}
                iconName={"local-fire-department"}
            />
            <HealthValueView
                title={"Water"}
                description={"Last 24 hours"}
                value={water}
                unit={"L"}
                titleColor={"blue"}
                iconName={"water-drop"}
            />
            <HealthValueView
                title={"Carbohydrates"}
                description={"Last 24 hours"}
                value={carbohydrates}
                unit={"kcal"}
                titleColor={"green"}
                iconName={"height"}
            />
            <HealthValueView
                title={"Body Fat Percentage"}
                value={bodyFatPercentage}
                unit={"%"}
                titleColor={"gray"}
                iconName={"man"}
            />
            <HealthValueView
                title={"Average Diastolic Blood Pressure"}
                description={"Last month"}
                value={diastolicBloodPressure}
                unit={"mmHg"}
                titleColor={"red"}
                iconName={"bloodtype"}
            />
            <HealthValueView
                title={"Average Systolic Blood Pressure"}
                description={"Last month"}
                value={systolicBloodPressure}
                unit={"mmHg"}
                titleColor={"red"}
                iconName={"bloodtype"}
            />
            <HealthValueView
                title={"Sleep Hours"}
                description={"Last 24 hours"}
                value={sleep}
                unit={"hour(s)"}
                titleColor={"orange"}
                iconName={"bedtime"}
            />
        </View>
    )
}

export default HealthInformationView
