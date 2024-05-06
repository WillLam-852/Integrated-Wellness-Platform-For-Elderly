/* eslint-disable prettier/prettier */
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useEffect, useState } from "react"

import { Brand } from "@/components/molecules"
import { Button } from "react-native-paper"
import ColorsWatchImage from "@/theme/assets/images/colorswatch.png"
import { ImageVariant } from "@/components/atoms"
import { MainStackScreenProps } from "@/navigators/navigation"
import { SafeScreen } from "@/components/template"
import SendImage from "@/theme/assets/images/send.png"
import TranslateImage from "@/theme/assets/images/translate.png"
import { fetchOne } from "@/services/users"
import i18next from "i18next"
import { isImageSourcePropType } from "@/types/guards/image"
import { useQuery } from "@tanstack/react-query"
import { useTheme } from "@/theme"
import { useTranslation } from "react-i18next"
import useViewModel from "./useViewModel"

function ExerciseScreen() {
    const { t } = useTranslation(["exercise", "welcome"])

    const { colors, variant, changeTheme, layout, gutters, fonts, components, backgrounds } = useTheme()
    const { startCameraPressed } = useViewModel()

    const [currentId, setCurrentId] = useState(-1)

    const { isSuccess, data, isFetching } = useQuery({
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

    const onChangeTheme = () => {
        changeTheme(variant === "default" ? "dark" : "default")
    }

    const onChangeLanguage = (lang: "fr" | "en") => {
        void i18next.changeLanguage(lang)
    }

    if (!isImageSourcePropType(SendImage) || !isImageSourcePropType(ColorsWatchImage) || !isImageSourcePropType(TranslateImage)) {
        throw new Error("Image source is not valid")
    }

    return (
        <SafeScreen>
            <ScrollView>
                <View style={[layout.justifyCenter, layout.itemsCenter, gutters.marginTop_80]}>
                    <View style={[layout.relative, backgrounds.gray100, components.circle250]} />

                    <View style={[layout.absolute, gutters.paddingTop_80]}>
                        <Brand height={300} width={300} />
                    </View>
                </View>

                <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
                    <View style={[gutters.marginTop_40]}>
                        <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>{t("welcome:title")}</Text>
                        <Text style={[fonts.gray400, fonts.bold, fonts.size_24, gutters.marginBottom_32]}>{t("welcome:subtitle")}</Text>
                        <Text style={[fonts.size_16, fonts.gray200, gutters.marginBottom_40]}>{t("welcome:description")}</Text>
                    </View>

                    <View style={[layout.row, layout.justifyBetween, layout.fullWidth, gutters.marginTop_16]}>
                        <TouchableOpacity testID="fetch-user-button" style={[components.buttonCircle, gutters.marginBottom_16]} onPress={() => setCurrentId(Math.ceil(Math.random() * 10 + 1))}>
                            {isFetching ? <ActivityIndicator /> : <ImageVariant source={SendImage} style={{ tintColor: colors.purple500 }} />}
                        </TouchableOpacity>

                        <TouchableOpacity testID="change-theme-button" style={[components.buttonCircle, gutters.marginBottom_16]} onPress={() => onChangeTheme()}>
                            <ImageVariant source={ColorsWatchImage} style={{ tintColor: colors.purple500 }} />
                        </TouchableOpacity>

                        <TouchableOpacity testID="change-language-button" style={[components.buttonCircle, gutters.marginBottom_16]} onPress={() => onChangeLanguage(i18next.language === "fr" ? "en" : "fr")}>
                            <ImageVariant source={TranslateImage} style={{ tintColor: colors.purple500 }} />
                        </TouchableOpacity>

                        <Button onPress={startCameraPressed}>Start Camera</Button>
                    </View>
                </View>
            </ScrollView>
        </SafeScreen>
    )
}

export default ExerciseScreen
