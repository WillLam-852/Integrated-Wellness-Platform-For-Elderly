import React, { useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Animated
} from "react-native"
import { SafeScreen } from "@/components/template";
import { MainBottomTabScreenProps } from "@/navigators/navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import useViewModel from "./useViewModel";

function QuizScreen({ navigation }: MainBottomTabScreenProps) {

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
        setStage 
    } = useViewModel();

    const handleStart = () => {
        setStage('quiz');
        fadeIn();
    }

    const handleAnswer = (option: string) => {
        const newAnswers = [...userAnswers, { question: questions[currentQuestionIndex].questionText, answer: option }];
        setUserAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            fadeOut();
        } else {
            fadeOut();
            setStage('end');
        }
    };

    const handleRestart = () => {
        setStage('start');
        setCurrentQuestionIndex(0);
        fadeIn();
    }

    useEffect(() => {
        if (stage === 'quiz') {
            fadeIn();
        }
    }, [stage, currentQuestionIndex]);

    return (
        <SafeScreen>
            <View style={styles.container}>
                {stage === 'start' && (
                    <View style={styles.startContainer}>
                        <Text style={styles.title}>Welcome to Elderly Nutrition Assessment Tool!</Text>
                        <Text style={styles.description}>
                            Welcome to the Elderly Nutrition Assessment Tool. This questionnaire is designed to help us understand the dietary needs and health challenges faced by older adults. Your responses will enable us to provide tailored nutritional advice that can contribute to improved health and well-being. The questionnaire consists of multiple-choice questions and should take about 5-10 minutes to complete. Please answer each question based on the current conditions and daily habits of the elderly individual in question. Thank you for participating and helping us better serve the nutritional needs of the elderly community. Tap 'Start' to begin!
                        </Text>
                        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
                            <Text style={styles.buttonText}>Start</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {stage === 'quiz' && (
                    <View style={styles.quizContainer}>
                        <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
                            <MaterialCommunityIcons name="restart" size={32} color="#000"/>
                        </TouchableOpacity>
                        <Animated.View style={[styles.fadeContainer, {opacity: fadeAnim}]}>
                            <Text style={styles.question}>
                                {questions[currentQuestionIndex].questionText}
                            </Text>
                            {questions[currentQuestionIndex].options.map((option, oIndex) => (
                                <TouchableOpacity key={oIndex} style={styles.optionButton} onPress={() => handleAnswer(option)}>
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </Animated.View>
                    </View>
                )}

                {stage === 'end' && (
                    <View style={styles.endContainer}>
                        <Text style={styles.finishText}>You have finished the quiz!</Text>
                        <Text style={styles.resultsTitle}>Your Answers:</Text>
                        {userAnswers.map((item, index) => (
                            <Text key={index} style={styles.answerText}>
                                Q: {item.question} - A: {item.answer}
                            </Text>
                        ))}
                        <TouchableOpacity style={styles.homeButton} onPress={handleRestart}>
                            <Text style={styles.buttonText}>Restart</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeScreen>
    )
}

export default QuizScreen;