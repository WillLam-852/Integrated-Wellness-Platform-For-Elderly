import BackButton from "@/components/backButton/BackButton"
import ExerciseDetailsScreen from "@/screens/ExerciseDetails/ExerciseDetailsScreen"
import { MainRoute } from "./ScreenRoute"
import type { MainStackParamList } from "@/navigators/navigation"
import { NavigationContainer } from "@react-navigation/native"
import TabScreen from "./TabScreen"
import { Text } from "react-native-paper"
import { createStackNavigator } from "@react-navigation/stack"
import { useTheme } from "@/theme"

const Stack = createStackNavigator<MainStackParamList>()

function ApplicationNavigator() {
    const { variant, navigationTheme } = useTheme()

    return (
        <NavigationContainer theme={navigationTheme}>
            <Stack.Navigator>
                <Stack.Screen
                    name={MainRoute.TabScreen}
                    component={TabScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={MainRoute.ExerciseDetailsScreen}
                    component={ExerciseDetailsScreen}
                    options={{
                        headerLeft: () => <BackButton />,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ApplicationNavigator
