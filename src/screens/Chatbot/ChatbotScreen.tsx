import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    View,
} from "react-native"
import React, { useState, useEffect } from "react"
import ChatMessage from "@/models/ChatMessage"
import { MainBottomTabScreenProps } from "@/navigators/navigation"
import { SafeScreen } from "@/components/template"
import { getChatIconImage } from "@/resources/images"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import useViewModel from "./useViewModel"
import { TabRoute } from "@/navigators/ScreenRoute"

function ChatbotScreen({ route, navigation }: MainBottomTabScreenProps) {
    const { t } = useTranslation(["chatbotScreen"]);
    const isNeedToFetchHealthAdvice = route.params?.isNeedToFetchHealthAdvice;
    const requestQuestion = route.params?.requestQuestion;
    const { messages, setMessages, styles } = useViewModel()

    const handleNavigateToQuizScreen = () => {
        navigation.navigate(TabRoute.QuizScreen)
    }

    // Define the fetch function for getting dietary advice
    const fetchAdvice = async ({ message }: { message: string | undefined }) => {
        if ( message === undefined ) return;
        const url = 'http://8.138.125.164/ai/generate';
        const params = new URLSearchParams({message});
        const response = await fetch(`${url}?${params.toString()}`);
        if (!response.ok) {
            throw new Error('Failed to fetch dietary advice');
        }
        return response.json();
    };

    const {
        data,
        isSuccess,
        isFetching,
        isError,
        error,
    } = useQuery({
        queryKey: ['advice', requestQuestion],
        queryFn: () => fetchAdvice({message: requestQuestion}),
        enabled: !!requestQuestion && isNeedToFetchHealthAdvice,
    });

    const UserMessage = ({ message }: { message: ChatMessage }) => (
        <View style={[styles.messageWrapper, styles.userMessageWrapper]}>
            <View style={[styles.messageTail, styles.userMessageTail]} />
            <View style={[styles.message, styles.userMessage]}>
                <Text style={styles.messageText}>{message.text}</Text>
            </View>
            <Image
                source={getChatIconImage(message.type)}
                style={styles.icon}
            />
        </View>
    )

    const BotMessage = ({ message }: { message: ChatMessage }) => (
        <View style={[styles.messageWrapper, styles.botMessageWrapper]}>
            <Image
                source={getChatIconImage(message.type)}
                style={styles.icon}
            />
            <View style={[styles.messageTail, styles.botMessageTail]} />
            <View style={[styles.message, styles.botMessage]}>
                <Text style={styles.messageText}>{message.text}</Text>
            </View>
        </View>
    )

    // TODO: Give a pop up window to show update the data successfully.
    useEffect(() => {
        console.log("The value of isSuccess is: ", isSuccess);
        if(isSuccess) {
            console.log("The advice data is: ", data);
            setMessages([...messages, new ChatMessage('bot', data.data)]);
        }
    }, [isSuccess]);

    if (!isNeedToFetchHealthAdvice) {
        return (
            <SafeScreen>
                <View style={styles.needAccessmentInformationContainer}>
                    <Text style={styles.needAccessmentNotification}>
                        {t("chatbotScreen:AccessmentNotification")}
                    </Text>
                    <TouchableOpacity
                        style={styles.needAccessmentButton}
                        onPress={() => handleNavigateToQuizScreen()}
                    >
                        <Text style={styles.needAccessmentButtonText}>
                            {t("chatbotScreen:AccessmentNavigateButtonText")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeScreen> 
        )
    }

    if (isFetching) {
        return (
            <SafeScreen>
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator size="large" color="#90B44B"/>
                    <Text style={styles.indicatorInformation}>
                        {t("chatbotScreen:loading")}
                    </Text>
                </View>
            </SafeScreen>
        )
    }

    if (isError) {
        return <Text>{t("chatbotScreen:error")}{error.message} </Text>
    }

    return (
        <SafeScreen>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior="padding"
            >
                <ScrollView contentContainerStyle={styles.messagesContainer}>
                    {messages.map((message, index) =>
                        message.type === "bot" ? (
                            <BotMessage message={message} key={index} />
                        ) : (
                            <UserMessage message={message} key={index} />
                        )
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeScreen>
    )
}

export default ChatbotScreen
