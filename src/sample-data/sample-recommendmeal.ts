import RecommendMeal from "@/models/RecommendMeal"

const sampleRecommendMeal: RecommendMeal[] = [
    new RecommendMeal(
        1,
        "牛奶燕麥粥",
        "一份健康的早餐，富含纖維和蛋白質。",
        250,
        10,
        5,
        45,
        "早餐",
        "健康",
        "https://www.example.com/image-link",
        "https://www.example.com/recipe-link"
    ),
    new RecommendMeal(
        2,
        "雞胸沙拉",
        "一份低脂高蛋白的午餐，包含豐富的維生素。",
        300,
        30,
        10,
        20,
        "午餐",
        "低脂",
        "https://www.example.com/image-link",
        "https://www.example.com/recipe-link"
    ),
    new RecommendMeal(
        3,
        "烤三文魚",
        "一份高蛋白的晚餐，富含奧米加3脂肪酸。",
        400,
        35,
        20,
        10,
        "晚餐",
        "高蛋白",
        "https://www.example.com/image-link",
        "https://www.example.com/recipe-link"
    ),
]

export default sampleRecommendMeal