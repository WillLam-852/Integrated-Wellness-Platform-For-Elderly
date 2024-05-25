import { useEffect, useState } from "react"

import ActResult from "@/native-module/dto/ActResult"
import Exercise from "@/models/Exercise"
import NativeCameraModule from "@/native-module/NativeCameraModule"
import PlannedExercise from "@/models/PlannedExercise"
import { StyleSheet } from "react-native"

const useViewModel = () => {
    const [selectedItemIDs, setSelectedItemIDs] = useState<number[]>([])

    const [selectedPlannedExercises, setSelectedPlannedExercises] = useState<
        PlannedExercise[]
    >([])

    useEffect(() => {
        let plannedExercisesList: PlannedExercise[] = []
        selectedItemIDs.forEach((id) => {
            plannedExercisesList.push(new PlannedExercise(id, 1, 10, 1))
        })
        setSelectedPlannedExercises(plannedExercisesList)
    }, [selectedItemIDs])

    const handleItemPress = (itemId: number) => {
        setSelectedItemIDs((prevSelectedItems) => {
            if (prevSelectedItems.includes(itemId)) {
                // Deselect the item if it's already selected
                return prevSelectedItems.filter((item) => item !== itemId)
            } else {
                // Select the item if it's not already selected
                return [...prevSelectedItems, itemId]
            }
        })
    }

    const selectAllPressed = () => {
        setSelectedItemIDs([1, 2, 3])
    }

    const clearPressed = () => {
        setSelectedItemIDs([])
    }

    const startCameraPressed = () => {
        if (selectedPlannedExercises.length == 0) {
            return
        }
        NativeCameraModule.startCamera(
            selectedPlannedExercises,
            startCameraCallback
        )
    }

    const startCameraCallback = (error?: string, result?: ActResult) => {
        if (error) {
            console.log("startCameraCallback:", error)
        }
    }

    const styles = StyleSheet.create({
        item: {
            height: 100,
            flexDirection: "row",
        },
        selectedItem: {
            backgroundColor: "#c9c7c7",
        },
        text: {
            paddingLeft: 10,
            paddingTop: 10,
        },
        tick: {
            position: "absolute",
            top: 25,
            right: 0,
        },
        image: {
            height: 100,
            width: 100,
        },
        button: {
            margin: 20,
        },
    })

    return {
        selectedItemIDs,
        handleItemPress,
        startCameraPressed,
        selectAllPressed,
        clearPressed,
        styles,
    }
}

export default useViewModel
