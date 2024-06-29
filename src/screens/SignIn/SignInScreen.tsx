import { Button, Text, TextInput } from "react-native-paper"
import { Image, SafeAreaView, View } from "react-native"

import React from "react"
import { getPlatformLogo } from "@/resources/images"
import { useTranslation } from "react-i18next"
import useViewModel from "./useViewModel"

const SignInScreen = () => {
    const { t } = useTranslation(["signInScreen"])
    const viewModel = useViewModel()
    const { username, password, setUsername, setPassword, signIn, styles } =
        viewModel

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{t("signInScreen:app-name")}</Text>
            <Image source={getPlatformLogo()} style={styles.logo} />
            <TextInput
                style={styles.input}
                placeholder={t("signInScreen:username")}
                onChangeText={setUsername}
                value={username}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder={t("signInScreen:password")}
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <Button
                onPress={signIn}
                mode="contained"
                style={styles.button}
                labelStyle={styles.buttonLabel}
            >
                {t("signInScreen:sign-in")}
            </Button>
        </SafeAreaView>
    )
}

export default SignInScreen
