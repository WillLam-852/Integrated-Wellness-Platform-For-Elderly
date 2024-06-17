import { useEffect, useState } from "react"

import ActResult from "@/native-module/dto/ActResult"
import { ExerciseDetailsScreenProps } from "@/navigators/navigation"
import { MainRoute } from "@/navigators/ScreenRoute"
import NativeCameraModule from "@/native-module/NativeCameraModule"
import PlannedExercise from "@/models/PlannedExercise"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"

const useViewModel = () => {
    const [selectedItemIDs, setSelectedItemIDs] = useState<number[]>([])
    const { navigate } =
        useNavigation<ExerciseDetailsScreenProps["navigation"]>()

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

    const goToDetailScreenPressed = (
        exerciseName: string,
        exerciseVideoLink?: string
    ) => {
        navigate(MainRoute.ExerciseDetailsScreen, {
            exerciseName,
            exerciseVideoLink,
        })
    }

    const styles = StyleSheet.create({
        selectedItem: {
            backgroundColor: "#c9c7c7",
        },
        text: {
            fontSize: 32,
            color: "#333",
        },
        subText: {
            fontSize: 16,
            color: "#666",
            marginTop: 4,
        },
        tick: {
            position: "absolute",
            bottom: 15,
            right: 15,
            fontSize: 48,
            color: "#90B44B",
        },
        button: {
            backgroundColor: "#90B44B",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            flex: 1,
            marginHorizontal: 5,
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
        },
        buttonStartCamera: {
            backgroundColor: "#90B44B",
            paddingVertical: 15,
            borderRadius: 5,
            alignItems: "center",
            marginHorizontal: 8,
            marginVertical: 16,
        },
        buttonTextStartCamera: {
            color: "#fff",
            fontSize: 32,
            fontWeight: "bold",
        },
        buttonText: {
            color: "#fff",
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
        },
        exerciseListContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "stretch",
            padding: 10,
        },
        exerciseListItem: {
            flexDirection: "row",
            backgroundColor: "#f9f9f9",
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ddd",
            marginVertical: 8,
            alignItems: "center",
        },
        exerciseListImage: {
            height: 100,
            width: 100,
            borderRadius: 50,
            marginRight: 20,
        },
        exerciseListSeparator: {
            height: 10,
        },
        exerciseListTextContainer: {
            flex: 1,
            flexDirection: "column",
        },
        detailsButton: {
            position: "absolute",
            top: 10,
            right: 10,
        },
    })

    return {
        selectedItemIDs,
        handleItemPress,
        startCameraPressed,
        selectAllPressed,
        clearPressed,
        goToDetailScreenPressed,
        styles,
    }
}

export default useViewModel
