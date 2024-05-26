export const E1 = require("./E1.png")
export const E2 = require("./E2.png")
export const E3 = require("./E3.png")

export const RecommendMeal1 = require("./recommend_meal_1.jpeg")
export const RecommendMeal2 = require("./recommend_meal_2.jpeg")
export const RecommendMeal3 = require("./recommend_meal_3.jpeg")

export const RecommendRestaurant1 = require("./recommend_restaurant_1.jpeg")
export const RecommendRestaurant2 = require("./recommend_restaurant_2.jpeg")
export const RecommendRestaurant3 = require("./recommend_restaurant_3.jpeg")

export const ChatIconBot = require("./chat_icon_bot.jpeg")
export const ChatIconMan = require("./chat_icon_man.jpeg")
export const ChatIconWomen = require("./chat_icon_woman.jpeg")

export const ProfileIcon = require("./profile_icon.png")

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

export const getChatIconImage = (id: string) => {
    return ChatIconIndex[id]
}

export const getProfileIcon = () => {
    return profileIconIndex[1]
}
