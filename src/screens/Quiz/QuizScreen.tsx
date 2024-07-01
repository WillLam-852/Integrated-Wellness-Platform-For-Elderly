import {
    Animated,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native"
import React, { useEffect } from "react"
import { Checkbox } from "react-native-paper"
import { MainBottomTabScreenProps } from "@/navigators/navigation"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { SafeScreen } from "@/components/template"
import { TabRoute } from "@/navigators/ScreenRoute"
import useViewModel from "./useViewModel"
import { useTranslation } from "react-i18next"
import i18next from "i18next"
import Question from "@/models/Question"

function QuizScreen({ navigation }: MainBottomTabScreenProps) {
    const { t } = useTranslation(["quizScreen"]);
    const {
        questions,
        userAnswers,
        setUserAnswers,
        fadeAnim,
        fadeIn,
        fadeOut,
        styles,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        stage,
        setStage,
        isHealthInformationEmbeded,
        setIsHealthInformationEmbeded,
        getRequestQuestion
    } = useViewModel()

    const handleGetHealthInformation = () => {
        navigation.navigate(TabRoute.ProfileScreen)
    }

    const handleResultSubmitToChatbot = () => {
        const requestQuestionPrefix = t("quizScreen:endQuezGetAdvicePrefix")
        const requestQuestion = getRequestQuestion({ preSetMessage: requestQuestionPrefix, userAnswers: userAnswers});
        navigation.navigate(TabRoute.ChatbotScreen, { isNeedToFetchHealthAdvice: true, requestQuestion: requestQuestion})
    }

    const handleStart = () => {
        setStage("quiz")
        fadeIn()
    }

    const handleAnswer = (question: string, option: string) => {
        const newAnswers = [
            ...userAnswers,
            {
                question: question,
                answer: option,
            },
        ]
        setUserAnswers(newAnswers)

        if (currentQuestionIndex < questions.length - 1) {
            fadeOut()
        } else {
            fadeOut()
            setStage("end")
        }
    }

    const handleRestart = () => {
        setStage("start")
        setCurrentQuestionIndex(0)
        setUserAnswers([])
        fadeIn()
    }

    const QuizStartSection = () => (
        <View style={styles.startContainer}>
            <Text style={styles.title}>{t("quizScreen:startQuizTitle")}</Text>
            <Text style={styles.description}>{t("quizScreen:startQuizDescription")}</Text>
            <TouchableOpacity
                style={styles.startButton}
                onPress={handleStart}
            >
                <Text style={styles.buttonText}>{t("quizScreen:startQuizButtonText")}</Text>
            </TouchableOpacity>
        </View>
    )

    const QuizProgressSection = ({questions, currentQuestionIndex}: {questions: Question[], currentQuestionIndex: number}) => (
        <View style={styles.quizContainer}>
            <QuizProgressSectionRestartButton />
            <Animated.View
                style={[
                    styles.fadeContainer,
                    { opacity: fadeAnim },
                ]}
            >
                <QuizProgressSectionQuestion lang={i18next.language} questions={questions} currentQuestionIndex={currentQuestionIndex}/>
                <QuizProgrssSectionOptions lang={i18next.language} questions={questions} currentQuestionIndex={currentQuestionIndex}/>
            </Animated.View>
        </View>
    )

    const QuizProgressSectionRestartButton = () => (
        <TouchableOpacity
        style={styles.restartButton}
        onPress={handleRestart}
        >
            <MaterialCommunityIcons
                name="restart"
                size={32}
                color="#000"
            />
        </TouchableOpacity>
    )

    const QuizProgressSectionQuestion = ( { lang, questions, currentQuestionIndex }: { lang: string, questions: Question[], currentQuestionIndex: number}) => (
        <Text style={styles.question}>
        {
            lang === "en"
            ? questions[currentQuestionIndex].questionTextEn
            : questions[currentQuestionIndex].questionTextZh
        }
        </Text>
    )

    const QuizProgrssSectionOptions = ( { lang, questions, currentQuestionIndex }: { lang: string, questions: Question[], currentQuestionIndex: number}) => {
        const currentQuestion = lang === "en" ? questions[currentQuestionIndex].questionTextEn : questions[currentQuestionIndex].questionTextZh
        const currentOptionSet = lang === "en" ? questions[currentQuestionIndex].optionsEn : questions[currentQuestionIndex].optionsZh  
        return (
            currentOptionSet.map(
                (option, oIndex) => (
                    <TouchableOpacity
                        key={oIndex}
                        style={styles.optionButton}
                        onPress={() => handleAnswer(currentQuestion, option)}
                    >
                        <Text style={styles.optionText}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                )
            )
        )
    }

    const QuizEndSection = () => (
        <View style={styles.endContainer}>
            <View style={styles.stretchContainer}>
                <Text style={styles.finishText}>
                    {t("quizScreen:endQuizTitle")}
                </Text>
                <Text style={styles.resultsTitle}>
                    {t("quizScreen:endQuizSubtitle")}
                </Text>
                {userAnswers.map((item, index) => (
                    <View key={index} style={styles.resultView}>
                        <Text style={styles.questionText}>
                            Q: {item.question}
                        </Text>
                        <Text style={styles.answerText}>
                            A: {item.answer}
                        </Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity
                style={styles.functionalButton}
                onPress={handleRestart}
            >
                <Text style={styles.buttonText}>
                    {t("quizScreen:endQuizRestartButtonText")}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.functionalButton}
                onPress={handleResultSubmitToChatbot}
            >
                <Text style={styles.buttonText}>
                    {t("quizScreen:endQuizGetAdvice")}
                </Text>
            </TouchableOpacity>
            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={isHealthInformationEmbeded ? 'checked' : "unchecked"}
                    onPress={() => {setIsHealthInformationEmbeded(!isHealthInformationEmbeded)}}
                />
                <Text style={styles.checkboxLabel}>{t("quizScreen:endQuizAddHealthInformation")}</Text>
            </View>
        </View>
    )

    useEffect(() => {
        if (stage === "quiz") {
            fadeIn()
        }
    }, [stage, currentQuestionIndex])

    return (
        <SafeScreen>
            <ScrollView>
                <View style={styles.container}>
                    {stage === "start" && ( <QuizStartSection/> )}
                    {stage === "quiz" && ( 
                        <QuizProgressSection 
                            questions={questions} 
                            currentQuestionIndex={currentQuestionIndex}
                        /> 
                    )}
                    {stage === "end" && (
                        <QuizEndSection />
                    )}
                </View>
            </ScrollView>
        </SafeScreen>
    )
}

export default QuizScreen
