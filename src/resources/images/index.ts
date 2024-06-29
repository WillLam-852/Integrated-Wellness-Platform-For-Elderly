import ChatIconBot from "./chat_icon_bot.jpeg"
import ChatIconMan from "./chat_icon_man.jpeg"
import ChatIconWomen from "./chat_icon_woman.jpeg"
import E1 from "./E1.png"
import E2 from "./E2.png"
import E3 from "./E3.png"
import LogoBistro from "./logo_bistro.jpeg"
import LogoPizza from "./logo_pizza.jpeg"
import LogoSushi from "./logo_sushi.jpeg"
import PlatformLogo from "./platform_logo.png"
import ProfileIcon from "./profile_icon.png"
import RecommendMeal1 from "./recommend_meal_1.jpeg"
import RecommendMeal2 from "./recommend_meal_2.jpeg"
import RecommendMeal3 from "./recommend_meal_3.jpeg"
import RecommendRestaurant1 from "./recommend_restaurant_1.jpeg"
import RecommendRestaurant2 from "./recommend_restaurant_2.jpeg"
import RecommendRestaurant3 from "./recommend_restaurant_3.jpeg"

const exerciseIndex: {
    [key: number]: any
} = {
    1: E1,
    2: E2,
    3: E3,
}

const recommendMealIndex: {
    [key: number]: any
} = {
    1: RecommendMeal1,
    2: RecommendMeal2,
    3: RecommendMeal3,
}

const recommendRestaurantIndex: {
    [key: number]: any
} = {
    1: RecommendRestaurant1,
    2: RecommendRestaurant2,
    3: RecommendRestaurant3,
}

const recommendRestaurantLogoIndex: {
    [key: number]: any
} = {
    1: LogoBistro,
    2: LogoSushi,
    3: LogoPizza,
}

const ChatIconIndex: {
    [id: string]: any
} = {
    bot: ChatIconBot,
    man: ChatIconMan,
    woman: ChatIconWomen,
}

const profileIconIndex: {
    [key: number]: any
} = {
    1: ProfileIcon,
}

export const getExerciseIcon = (id: number) => {
    return exerciseIndex[id]
}

export const getRecommendMealImage = (id: number) => {
    return recommendMealIndex[id]
}

export const getRecommendRestaurantImage = (id: number) => {
    return recommendRestaurantIndex[id]
}

export const getRecommendRestaurantLogoImage = (id: number) => {
    return recommendRestaurantLogoIndex[id]
}

export const getChatIconImage = (id: string) => {
    return ChatIconIndex[id]
}

export const getProfileIcon = () => {
    return profileIconIndex[1]
}

export const getPlatformLogo = () => {
    return PlatformLogo
}
