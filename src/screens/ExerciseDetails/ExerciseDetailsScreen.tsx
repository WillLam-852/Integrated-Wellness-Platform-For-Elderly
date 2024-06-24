import { Alert, Button, SafeAreaView } from "react-native"
import { useCallback, useEffect, useState } from "react"

import { Text } from "react-native-paper"
import YoutubePlayer from "react-native-youtube-iframe"
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
            <YoutubePlayer
                height={300}
                play={true}
                videoId={exerciseVideoLink}
                webViewStyle={styles.video}
            />
        </SafeAreaView>
    )
}

export default ExerciseDetailsScreen
