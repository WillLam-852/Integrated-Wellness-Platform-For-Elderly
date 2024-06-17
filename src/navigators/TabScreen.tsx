import {
    BottomTabParamList,
    MainStackScreenProps,
} from "@/navigators/navigation"
import {
    ChatbotScreen,
    ExerciseScreen,
    ProfileScreen,
    QuizScreen,
} from "@/screens"

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MealScreen from "@/screens/Meal/MealScreen"
import { RouteProp } from "@react-navigation/native"
import { TabRoute } from "./ScreenRoute"
import { Text } from "react-native-paper"
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
                        <MaterialCommunityIcons
                            name="lightning-bolt-outline"
                            size={30}
                            color={focused ? "#86C166" : "#BDC0BA"}
                        />
                    )
                case TabRoute.MealScreen:
                    return (
                        <MaterialCommunityIcons
                            name="food-takeout-box-outline"
                            size={30}
                            color={focused ? "#86C166" : "#BDC0BA"}
                        />
                    )
                case TabRoute.ChatbotScreen:
                    return (
                        <MaterialCommunityIcons
                            name="chat-minus-outline"
                            size={30}
                            color={focused ? "#86C166" : "#BDC0BA"}
                        />
                    )
                case TabRoute.QuizScreen:
                    return (
                        <MaterialCommunityIcons
                            name="chat-question-outline"
                            size={30}
                            color={focused ? "#86C166" : "#BDC0BA"}
                        />
                    )
                case TabRoute.ProfileScreen:
                    return (
                        <MaterialCommunityIcons
                            name="account-circle-outline"
                            size={30}
                            color={focused ? "#86C166" : "#BDC0BA"}
                        />
                    )
            }
        }

    const tabBarLabel =
        (route: RouteProp<BottomTabParamList, keyof BottomTabParamList>) =>
        ({ focused }: any) => {
            return (
                <Text style={{ color: focused ? "#86C166" : "#BDC0BA" }}>
                    {t(`screenRoute:${route.name}`)}
                </Text>
            )
        }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: tabBarIcon(route),
                tabBarLabel: tabBarLabel(route),
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#ffffff", // A clean white background
                    borderTopColor: "#dddddd", // Light grey border at the top for subtle separation
                    borderTopWidth: 1, // Thin border width
                    shadowColor: "#000000", // Black color for shadow to add depth
                    shadowOffset: { width: 0, height: -1 }, // Shadow placed at the top of the tab bar
                    shadowOpacity: 0.1, // Slightly visible shadow for subtle depth
                    shadowRadius: 3, // Soft shadow edges
                    elevation: 5, // Elevation for Android to create shadow effect
                },
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
            <Tab.Screen name={TabRoute.QuizScreen} component={QuizScreen} />
            <Tab.Screen
                name={TabRoute.ProfileScreen}
                component={ProfileScreen}
            />
        </Tab.Navigator>
    )
}

export default TabScreen
