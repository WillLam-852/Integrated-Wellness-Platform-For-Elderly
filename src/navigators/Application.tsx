import { MainRoute } from "./ScreenRoute"
import type { MainStackParamList } from "@/navigators/navigation"
import { NavigationContainer } from "@react-navigation/native"
import TabScreen from "./TabScreen"
import { createStackNavigator } from "@react-navigation/stack"
import { useTheme } from "@/theme"

const Stack = createStackNavigator<MainStackParamList>()

function ApplicationNavigator() {
    const { variant, navigationTheme } = useTheme()

    return (
        <NavigationContainer theme={navigationTheme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name={MainRoute.TabScreen}
                    component={TabScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ApplicationNavigator
