import {
    Image,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native"
import { Text, TextInput } from "react-native-paper"
import { getPlatformBackground, getPlatformLogo } from "@/resources/images"

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import React from "react"
import i18next from "i18next"
import { useTranslation } from "react-i18next"
import useViewModel from "./useViewModel"

const SignInScreen = () => {
    const { t } = useTranslation(["signInScreen"])
    const viewModel = useViewModel()
    const { userName, password, setUserName, setPassword, signIn, styles } =
        viewModel

    const onChangeLanguage = (lang: "zh" | "en") => {
        void i18next.changeLanguage(lang)
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss()
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={dismissKeyboard}
            >
                <ImageBackground
                    source={getPlatformBackground()}
                    style={styles.backgroundImage}
                >
                    <Image source={getPlatformLogo()} style={styles.logo} />
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() =>
                                onChangeLanguage(
                                    i18next.language === "en" ? "zh" : "en"
                                )
                            }
                            style={styles.languageButton}
                        >
                            <MaterialCommunityIcons
                                name="translate"
                                size={48}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>
                        {t("signInScreen:app-name")}
                    </Text>
                    <TextInput
                        mode="flat"
                        style={styles.input}
                        placeholder={t("signInScreen:username")}
                        onChangeText={setUserName}
                        value={userName}
                        autoCapitalize="none"
                        placeholderTextColor="#7d7d7d"
                    />
                    <TextInput
                        mode="flat"
                        style={styles.input}
                        placeholder={t("signInScreen:password")}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry
                        placeholderTextColor="#7d7d7d"
                    />
                    <TouchableOpacity
                        onPress={signIn}
                        style={styles.signInButton}
                    >
                        <Text style={styles.signInButtonLabel}>
                            {t("signInScreen:sign-in")}
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SignInScreen
