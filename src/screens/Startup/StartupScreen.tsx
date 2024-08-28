import { ActivityIndicator, Text, View } from "react-native"

import { Brand } from "@/components/molecules"
import type { MainBottomTabScreenProps } from "@/navigators/navigation"
import { SafeScreen } from "@/components/template"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useTheme } from "@/theme"
import { useTranslation } from "react-i18next"

function StartupScreen({ navigation }: MainBottomTabScreenProps) {
    const { layout, gutters, fonts } = useTheme()
    const { t } = useTranslation(["exercise"])

    const { isSuccess, isFetching, isError } = useQuery({
        queryKey: ["startup"],
        queryFn: () => {
            return Promise.resolve(true)
        },
    })

    return (
        <SafeScreen>
            <View style={[layout.flex_1, layout.col, layout.itemsCenter, layout.justifyCenter]}>
                <Brand />
                {isFetching && <ActivityIndicator size="large" style={[gutters.marginVertical_24]} />}
                {isError && <Text style={[fonts.size_16, fonts.red500]}>{t("exercise:error")}</Text>}
            </View>
        </SafeScreen>
    )
}

export default StartupScreen
