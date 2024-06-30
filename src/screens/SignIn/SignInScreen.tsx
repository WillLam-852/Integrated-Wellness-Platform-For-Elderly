import { Button, Text, TextInput } from "react-native-paper"
import { Image, SafeAreaView, View, TouchableOpacity, ImageBackground } from "react-native"
import React from "react"
import { getPlatformLogo, getPlatformBackground } from "@/resources/images"
import { useTranslation } from "react-i18next"
import i18next from "i18next"
import useViewModel from "./useViewModel"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const SignInScreen = () => {
    const { t } = useTranslation(["signInScreen"]);
    const viewModel = useViewModel();
    const { username, password, setUsername, setPassword, signIn, styles } = viewModel;

    const onChangeLanguage = (lang: "zh" | "en") => {
        void i18next.changeLanguage(lang)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={getPlatformBackground()} style={styles.backgroundImage}>
                <Image source={getPlatformLogo()} style={styles.logo} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => 
                        onChangeLanguage(i18next.language === "en" ? "zh" : "en")} 
                        style={styles.languageButton}
                    >
                        <MaterialCommunityIcons
                            name="translate"
                            size={48}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>{t("signInScreen:app-name")}</Text>
                <TextInput
                    mode="flat"
                    style={styles.input}
                    placeholder={t("signInScreen:username")}
                    onChangeText={setUsername}
                    value={username}
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
                    <Text style={styles.signInButtonLabel}>{t("signInScreen:sign-in")}</Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default SignInScreen
