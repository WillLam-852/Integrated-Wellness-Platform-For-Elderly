import { MainRoute, TabRoute } from "./ScreenRoute"

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import type { StackScreenProps } from "@react-navigation/stack"

export type MainStackParamList = {
    [MainRoute.TabScreen]: undefined
    [MainRoute.SignInScreen]: undefined
    [MainRoute.ExerciseDetailsScreen]: {
        exerciseName: string
        exerciseVideoLink?: string
    }
}

export type MainStackScreenProps = StackScreenProps<MainStackParamList>

export type BottomTabParamList = {
    [TabRoute.ExerciseScreen]: undefined
    [TabRoute.MealScreen]: undefined
    [TabRoute.ChatbotScreen]: undefined
    [TabRoute.ProfileScreen]: undefined
    [TabRoute.QuizScreen]: undefined
}

export type MainBottomTabScreenProps = BottomTabScreenProps<BottomTabParamList>

export type ExerciseDetailsScreenProps = StackScreenProps<
    MainStackParamList,
    MainRoute.ExerciseDetailsScreen
>
