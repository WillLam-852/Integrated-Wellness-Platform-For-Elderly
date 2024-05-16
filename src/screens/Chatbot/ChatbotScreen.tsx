import { Button, ScrollView, Text, View } from "react-native"
import { useEffect, useState } from "react"

import { MainBottomTabScreenProps } from "@/navigators/navigation"
import { SafeScreen } from "@/components/template"
import i18next from "i18next"
import { useTheme } from "@/theme"
import { useTranslation } from "react-i18next"

function ChatbotScreen({ navigation }: MainBottomTabScreenProps) {
    const { t } = useTranslation()

    const { colors, variant, changeTheme, layout, gutters, fonts, components, backgrounds } = useTheme()

    return (
        <SafeScreen>
            <ScrollView>
                <View>
                    <Text>Chatbot Screen</Text>
                    <Button title="Go Back" onPress={() => navigation.goBack()} />
                </View>
            </ScrollView>
        </SafeScreen>
    )
}

export default ChatbotScreen
