import Question from "@/models/Question";

const sampleQuestions: Question[] = [
    new Question(
        1,
        "How old is the person and do they have any significant health conditions?",
        ["65-74, no significant conditions", "65-74, with conditions like diabetes or heart disease", "75+, no significant conditions", "75+, with conditions like diabetes or heart disease"]
    ),
    new Question(
        2,
        "What describes the person’s daily activity level?",
        ["Sedentary (little or no exercise)", "Lightly active (light exercise or sports 1-3 days/week)", "Moderately active (moderate exercise or sports 3-5 days/week)", "Very active (hard exercise or sports 6-7 days a week)"]
    ),
    new Question(
        3,
        "Are there any dietary restrictions or preferences?",
        ["None", "Allergies (specify)", "Vegetarian or vegan", "Other specific diets (low-sodium, diabetic)"]
    ),
    new Question(
        4,
        "What are the most common issues with their current diet?",
        ["Weight loss", "Weight gain", "Poor appetite", "None of the above"]
    ),
    new Question(
        5,
        "Are they currently taking any medications or supplements?",
        ["No medications or supplements", "Only medications", "Only supplements", "Both medications and supplements"]
    ),
    new Question(
        6,
        "Do they experience any digestive issues?",
        ["No issues", "Constipation", "Difficulty chewing or swallowing", "Acid reflux"]
    ),
    new Question(
        7,
        "How would you rate their daily fluid intake?",
        ["Less than recommended", "Meets the recommendations", "Exceeds the recommendations"]
    ),
    new Question(
        8,
        "How do they manage meal preparation and food access?",
        ["Prepares meals independently without difficulty", "Someone assists with meal preparation", "Has difficulty accessing fresh food", "Relies on pre-prepared or delivered meals"]
    )
];

export default sampleQuestions;