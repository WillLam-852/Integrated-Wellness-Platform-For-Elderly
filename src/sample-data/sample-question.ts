import Question from "@/models/Question";

const sampleQuestions = [
    new Question(
        1,
        "How old is the person and do they have any significant health conditions?",
        ["65-74, no significant conditions", "65-74, with conditions like diabetes or heart disease", "75+, no significant conditions", "75+, with conditions like diabetes or heart disease"],
        "这个人多大年龄，他们有任何重大健康状况吗？",
        ["65-74岁，没有重大健康状况", "65-74岁，有糖尿病或心脏病等状况", "75岁以上，没有重大健康状况", "75岁以上，有糖尿病或心脏病等状况"]
    ),
    new Question(
        2,
        "What describes the person’s daily activity level?",
        ["Sedentary (little or no exercise)", "Lightly active (light exercise or sports 1-3 days/week)", "Moderately active (moderate exercise or sports 3-5 days/week)", "Very active (hard exercise or sports 6-7 days a week)"],
        "如何描述此人的日常活动水平？",
        ["久坐（几乎不运动）", "轻度活跃（每周轻度运动或运动1-3天）", "中度活跃（每周中度运动或运动3-5天）", "非常活跃（每周6-7天剧烈运动或运动）"]
    ),
    new Question(
        3,
        "Are there any dietary restrictions or preferences?",
        ["None", "Allergies (specify)", "Vegetarian or vegan", "Other specific diets (low-sodium, diabetic)"],
        "是否有任何饮食限制或偏好？",
        ["无", "过敏（请注明）", "素食者或纯素食者", "其他特定饮食（低钠，糖尿病）"]
    ),
    new Question(
        4,
        "What are the most common issues with their current diet?",
        ["Weight loss", "Weight gain", "Poor appetite", "None of the above"],
        "他们目前的饮食最常见的问题是什么？",
        ["减肥", "增重", "食欲不振", "以上都不是"]
    ),
    new Question(
        5,
        "Are they currently taking any medications or supplements?",
        ["No medications or supplements", "Only medications", "Only supplements", "Both medications and supplements"],
        "他们目前是否服用任何药物或补充剂？",
        ["没有药物或补充剂", "只有药物", "只有补充剂", "药物和补充剂都有"]
    ),
    new Question(
        6,
        "Do they experience any digestive issues?",
        ["No issues", "Constipation", "Difficulty chewing or swallowing", "Acid reflux"],
        "他们是否有任何消化问题？",
        ["没有问题", "便秘", "咀嚼或吞咽困难", "胃酸倒流"]
    ),
    new Question(
        7,
        "How would you rate their daily fluid intake?",
        ["Less than recommended", "Meets the recommendations", "Exceeds the recommendations"],
        "您如何评价他们的每日液体摄入量？",
        ["少于推荐量", "符合推荐量", "超过推荐量"]
    ),
    new Question(
        8,
        "How do they manage meal preparation and food access?",
        ["Prepares meals independently without difficulty", "Someone assists with meal preparation", "Has difficulty accessing fresh food", "Relies on pre-prepared or delivered meals"],
        "他们如何管理餐食准备和食物获取？",
        ["独立准备餐食，没有困难", "有人协助准备餐食", "获取新鲜食物有困难", "依赖预制餐或外卖"]
    )
];


export default sampleQuestions;