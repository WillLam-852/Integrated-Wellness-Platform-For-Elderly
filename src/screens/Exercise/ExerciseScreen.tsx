/* eslint-disable prettier/prettier */
import {
    Alert,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native"
import { useEffect, useState } from "react"

import { Button } from "react-native-paper"
import Exercise from "@/models/Exercise"
import { SafeScreen } from "@/components/template"
import { fetchOne } from "@/services/users"
import { getExerciseIcon } from "@/resources/images"
import sampleExercise from "@/sample-data/sample-exercise"
import { useQuery } from "@tanstack/react-query"
import { useTheme } from "@/theme"
import { useTranslation } from "react-i18next"
import useViewModel from "./useViewModel"

function ExerciseScreen() {
    const { t } = useTranslation(["exercise", "welcome"])

    const { layout, fonts, backgrounds } = useTheme()

    const {
        selectedItemIDs,
        handleItemPress,
        selectAllPressed,
        clearPressed,
        startCameraPressed,
        styles,
    } = useViewModel()

    const [currentId, setCurrentId] = useState(-1)

    const { isSuccess, data } = useQuery({
        queryKey: ["exercise", currentId],
        queryFn: () => {
            return fetchOne(currentId)
        },
        enabled: currentId >= 0,
    })

    useEffect(() => {
        if (isSuccess) {
            Alert.alert(t("exercise:welcome", data.name))
        }
    }, [isSuccess, data])

    const renderItem = ({ item }: { item: Exercise }) => {
        const isSelected = selectedItemIDs.includes(item.id)

        return (
            <TouchableOpacity
                style={[styles.item, isSelected && styles.selectedItem]}
                onPress={() => handleItemPress(item.id)}
            >
                <Image
                    style={styles.image}
                    source={getExerciseIcon(item.id)}
                    resizeMode="contain"
                />
                {isSelected && (
                    <Text style={[fonts.size_80, styles.tick]}>✓</Text>
                )}
                <Text style={[fonts.size_32, styles.text]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <SafeScreen>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    paddingBottom: 10,
                }}
            >
                <Button mode="outlined" onPress={selectAllPressed}>
                    Select All
                </Button>
                <Button mode="outlined" onPress={clearPressed}>
                    Clear
                </Button>
            </View>
            <View style={[layout.justifyCenter, layout.itemsStretch]}>
                <FlatList
                    data={sampleExercise}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>
            <Button
                mode="contained"
                style={styles.button}
                contentStyle={{ height: 40 }}
                onPress={startCameraPressed}
            >
                <Text style={fonts.size_16}>Start Camera</Text>
            </Button>
        </SafeScreen>
    )
}

export default ExerciseScreen
