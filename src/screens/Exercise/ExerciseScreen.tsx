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

import Exercise from "@/models/Exercise"
import Ionicons from "react-native-vector-icons/Ionicons"
import { SafeScreen } from "@/components/template"
import { fetchOne } from "@/services/users"
import { getExerciseIcon } from "@/resources/images"
import sampleExercise from "@/sample-data/sample-exercise"
import { useQuery } from "@tanstack/react-query"
import { useTheme } from "@/theme"
import i18next from "i18next"
import { useTranslation } from "react-i18next"
import useViewModel from "./useViewModel"

function ExerciseScreen() {
    const { t } = useTranslation(['exerciseScreen', 'exercise'])

    const { fonts } = useTheme()

    const {
        selectedItemIDs,
        handleItemPress,
        selectAllPressed,
        clearPressed,
        startCameraPressed,
        goToDetailScreenPressed,
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
                style={[
                    styles.exerciseListItem,
                    isSelected && styles.selectedItem,
                ]}
                onPress={() => handleItemPress(item.id)}
            >
                <Image
                    style={styles.exerciseListImage}
                    source={getExerciseIcon(item.id)}
                    resizeMode="contain"
                />
                {isSelected && <Text style={styles.tick}>✓</Text>}
                <View style={styles.exerciseListTextContainer}>
                    <Text style={[fonts.size_32, styles.text]}>
                        {i18next.language === 'zh' ? item.nameZH : item.nameEN}
                    </Text>
                    <Text style={styles.subText}>
                        {t('exerciseScreen:difficultyLevel')} {item.intensity_level}
                    </Text>
                    <Text style={styles.subText}>{t('exerciseScreen:totalTargetCount')} {item.duration}</Text>
                </View>
                <TouchableOpacity
                    onPress={() =>
                        goToDetailScreenPressed(item.nameEN, item.video_link)
                    }
                    style={styles.detailsButton}
                >
                    <Ionicons
                        name="ellipsis-horizontal-circle-outline"
                        size={40}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
    return (
        <SafeScreen>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={selectAllPressed}
                >
                    <Text style={styles.buttonText}>{t('exerciseScreen:selectAll')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={clearPressed}>
                    <Text style={styles.buttonText}>{t('exerciseScreen:clear')}</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.exerciseListContainer]}>
                <FlatList
                    data={sampleExercise}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => (
                        <View style={styles.exerciseListSeparator} />
                    )}
                />
            </View>
            <TouchableOpacity
                style={styles.buttonStartCamera}
                onPress={startCameraPressed}
            >
                <Text style={styles.buttonTextStartCamera}>{t('exerciseScreen:startCamera')}</Text>
            </TouchableOpacity>
        </SafeScreen>
    )
}

export default ExerciseScreen
