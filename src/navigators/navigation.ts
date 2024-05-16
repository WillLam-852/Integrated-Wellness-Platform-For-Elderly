import { MainRoute, TabRoute } from "./ScreenRoute"

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import type { StackScreenProps } from "@react-navigation/stack"

export type MainStackParamList = {
    [MainRoute.TabScreen]: undefined
    [MainRoute.SignInScreen]: undefined
}

export type MainStackScreenProps = StackScreenProps<MainStackParamList>

export type BottomTabParamList = {
    [TabRoute.ExerciseScreen]: undefined
    [TabRoute.MealScreen]: undefined
    [TabRoute.ChatbotScreen]: undefined
    [TabRoute.ProfileScreen]: undefined
}

export type MainBottomTabScreenProps = BottomTabScreenProps<BottomTabParamList>
