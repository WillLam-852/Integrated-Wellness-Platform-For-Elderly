import {
    BottomTabParamList,
    MainStackScreenProps,
} from "@/navigators/navigation"
import { ChatbotScreen, ExerciseScreen, ProfileScreen } from "@/screens"

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MealScreen from "@/screens/Meal/MealScreen"
import { RouteProp } from "@react-navigation/native"
import { TabRoute } from "./ScreenRoute"
import { Text } from "react-native-paper"
import { View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useTranslation } from "react-i18next"

const TabScreen = ({ navigation }: MainStackScreenProps) => {
    const { t } = useTranslation(["screenRoute"])
    const Tab = createBottomTabNavigator<BottomTabParamList>()

    const tabBarIcon =
        (route: RouteProp<BottomTabParamList, keyof BottomTabParamList>) =>
        ({ focused }: any) => {
            switch (route.name) {
                case TabRoute.ExerciseScreen:
                    return (
                        <MaterialIcons
                            name="sports-gymnastics"
                            size={30}
                            color={focused ? "#90B44B" : undefined}
                        />
                    )
                case TabRoute.MealScreen:
                    return (
                        <MaterialCommunityIcons
                            name="food-apple"
                            size={30}
                            color={focused ? "#90B44B" : undefined}
                        />
                    )
                case TabRoute.ChatbotScreen:
                    return (
                        <MaterialCommunityIcons
                            name="chat-plus"
                            size={30}
                            color={focused ? "#90B44B" : undefined}
                        />
                    )
                case TabRoute.ProfileScreen:
                    return (
                        <MaterialIcons
                            name="person"
                            size={30}
                            color={focused ? "#90B44B" : undefined}
                        />
                    )
            }
        }

    const tabBarLabel =
        (route: RouteProp<BottomTabParamList, keyof BottomTabParamList>) =>
        ({ focused }: any) => {
            return (
                <Text style={{ color: focused ? "#90B44B" : undefined }}>
                    {t(`screenRoute:${route.name}`)}
                </Text>
            )
        }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: tabBarIcon(route),
                tabBarLabel: tabBarLabel(route),
                headerShwon: false,
            })}
            initialRouteName={TabRoute.ExerciseScreen}
        >
            <Tab.Screen
                name={TabRoute.ExerciseScreen}
                component={ExerciseScreen}
            />
            <Tab.Screen name={TabRoute.MealScreen} component={MealScreen} />
            <Tab.Screen
                name={TabRoute.ChatbotScreen}
                component={ChatbotScreen}
            />
            <Tab.Screen
                name={TabRoute.ProfileScreen}
                component={ProfileScreen}
            />
        </Tab.Navigator>
    )
}

export default TabScreen
