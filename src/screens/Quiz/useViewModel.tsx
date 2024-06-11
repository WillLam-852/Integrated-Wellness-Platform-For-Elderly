import Question from "@/models/Question";
import sampleQuestions from "@/sample-data/sample-question";
import { useState, useRef } from "react";
import { Animated } from "react-native";
import { StyleSheet } from "react-native";

export interface UserQuestionAndAnswerResult {
	question: string,
	answer: string
}

const useViewModel = () => {

	const [stage, setStage] = useState('start');
	const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
	const [userAnswers, setUserAnswers] = useState<UserQuestionAndAnswerResult[]>([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const fadeIn = () => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true
		}).start();
	};

	const fadeOut = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true
		}).start(() => {
			if (currentQuestionIndex < questions.length - 1) {
				setCurrentQuestionIndex(currentQuestionIndex + 1);
				fadeIn();
			}
		});
	};

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			padding: 20,
			backgroundColor: '#ffffff', // A clean white background to maintain neutrality and brightness
		},
		fadeContainer: {
			marginTop: 48,
			width: '100%',
			alignItems: 'center', // Ensures that the content within the fade container is centered
		},
		question: {
			fontSize: 32, // Significantly larger font size for better readability
			fontWeight: 'bold', // Bold font weight to emphasize the question text
			marginBottom: 20, // Provides ample space between the question and the options
			color: '#333', // Dark grey color for better visibility and contrast
		},
		optionButton: {
			backgroundColor: '#f0f0f0', // Soft grey background for the option buttons
			padding: 20, // Generous padding to ensure easy tapping
			width: '100%', // Button width to extend to full container width
			borderRadius: 30, // Smooth, rounded corners for a friendly, modern look
			borderWidth: 1, // Subtle border width to define the edges of the button clearly
			borderColor: '#ccc', // Light grey border color that doesn't overpower the button's appearance
			marginVertical: 10, // Vertical spacing between each button for clear separation
		},
		optionText: {
			fontSize: 24, // Larger font size for the option text to ensure it is easy to read
			color: '#000', // Black color for high contrast against the button background
			textAlign: 'center' // Ensures the text is centered within the button for aesthetic alignment
		},
		startContainer: {
			alignItems: 'center', // Center alignment for all items in the start container
		},
		title: {
			fontSize: 32,
			fontWeight: 'bold',
			marginBottom: 32,
		},
		description: {
			fontSize: 16,
			textAlign: 'center',
			marginBottom: 16,
		},
		startButton: {
			backgroundColor: '#3498db',
			padding: 15,
			borderRadius: 10,
			width: '100%', // Set a specific width for the start button to make it stand out
		},
		buttonText: {
			color: '#fff',
			fontSize: 24,
			textAlign: 'center', // Center-align text for uniformity
		},
		endContainer: {
			alignItems: 'center', // Center alignment for the end screen elements
		},
		finishText: {
			fontSize: 32,
			fontWeight: 'bold',
			marginBottom: 20,
		},
		homeButton: {
			backgroundColor: '#3498db',
			padding: 15,
			borderRadius: 10,
			width: '80%', // Consistent width with the start button for design uniformity
		},
		quizContainer: {
			flex: 1,
			width: '100%',
			alignItems: 'center',
			justifyContent: 'center',
			paddingTop: 10, // Adjust padding to avoid overlap with the status bar on some devices
		},
		restartButton: {
			position: 'absolute',
			top: 0,
			right: 0,
			backgroundColor: 'transparent',  // Set the background to transparent
			zIndex: 10,
		},	
		restartButtonText: {
			color: '#ffffff', // White text color
			fontSize: 16, // Font size for the button text
		},
		resultsTitle: {
			fontSize: 20,
			fontWeight: 'bold',
			marginTop: 20,
			marginBottom: 10,
		},
		answerText: {
			fontSize: 16,
			marginBottom: 5,
		},
	});

	return {
		styles,
		fadeAnim,
		fadeIn,
		fadeOut,
		questions,
		userAnswers,
		setUserAnswers,
		currentQuestionIndex,
		setCurrentQuestionIndex,
		stage,
		setStage,
	}
}

export default useViewModel;