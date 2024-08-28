import BackButton from "@/components/backButton/BackButton"
import ExerciseDetailsScreen from "@/screens/ExerciseDetails/ExerciseDetailsScreen"
import { MainRoute } from "./ScreenRoute"
import type { MainStackParamList } from "@/navigators/navigation"
import { NavigationContainer } from "@react-navigation/native"
import SignInScreen from "@/screens/SignIn/SignInScreen"
import TabScreen from "./TabScreen"
import authenticationSelector from "@/redux/authentication/selector"
import { createStackNavigator } from "@react-navigation/stack"
import { useSelector } from "react-redux"
import { useTheme } from "@/theme"

const Stack = createStackNavigator<MainStackParamList>()

function ApplicationNavigator() {
    const { variant, navigationTheme } = useTheme()
    const { isSignIn } = useSelector(authenticationSelector)

    return (
        <NavigationContainer theme={navigationTheme}>
            <Stack.Navigator>
                {isSignIn ? (
                    <>
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
                    </>
                ) : (
                    <Stack.Screen
                        name={MainRoute.SignInScreen}
                        component={SignInScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ApplicationNavigator
