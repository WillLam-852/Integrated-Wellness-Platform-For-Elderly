import { SafeAreaView } from "react-native"
import { Text } from "react-native-paper"
import YouTube from "react-native-youtube"
import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import useViewModel from "./useViewModel"

const ExerciseDetailsScreen = () => {
    const viewModel = useViewModel()
    const navigation = useNavigation()
    const { exerciseName, exerciseVideoLink, styles } = viewModel

    useEffect(() => {
        navigation.setOptions({
            title: exerciseName,
        })
    }, [])

    return (
        <SafeAreaView>
            <Text style={styles.title}>Video Tutorial</Text>
            <YouTube
                apiKey=""
                videoId={exerciseVideoLink} // The YouTube video ID
                play
                fullscreen // control whether the video should play in fullscreen or inline
                loop={false} // control whether the video should loop when ended
                style={styles.video}
            />
        </SafeAreaView>
    )
}

export default ExerciseDetailsScreen
