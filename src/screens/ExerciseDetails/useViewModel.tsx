import { ExerciseDetailsScreenProps } from "@/navigators/navigation"
import { StyleSheet } from "react-native"
import { useRoute } from "@react-navigation/native"

const useViewModel = () => {
    const { params } = useRoute<ExerciseDetailsScreenProps["route"]>()
    const { exerciseName, exerciseVideoLink } = params

    const styles = StyleSheet.create({
        title: {
            fontSize: 30,
            textAlign: "center",
            margin: 20,
        },
        video: {
            alignSelf: "stretch",
            height: "80%",
        },
    })

    return {
        exerciseName,
        exerciseVideoLink,
        styles,
    }
}

export default useViewModel
