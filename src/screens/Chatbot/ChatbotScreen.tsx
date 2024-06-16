import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import React, { useState, useEffect } from "react"
import ChatMessage from "@/models/ChatMessage"
import { MainBottomTabScreenProps } from "@/navigators/navigation"
import { SafeScreen } from "@/components/template"
import { getChatIconImage } from "@/resources/images"
import i18next from "i18next"
import { useQuery } from "@tanstack/react-query"
import { useTheme } from "@/theme"
import { useTranslation } from "react-i18next"
import useViewModel from "./useViewModel"

function ChatbotScreen({ navigation }: MainBottomTabScreenProps) {
    const { t } = useTranslation()

    const { messages, setMessages, styles } = useViewModel()
    const question = "Give me some dietary advice for the elderly";

    // Define the fetch function for getting dietary advice
    const fetchAdvice = async ({ message }: { message: string }) => {
        const url = 'https://whippet-one-brightly.ngrok-free.app/ai/generate';
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
        queryKey: ['advice', question], // Include message in the query key for cache uniqueness
        queryFn: () => fetchAdvice({message: question}),
        enabled: !!question, // Only run the query if message is not empty
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
            setMessages([...messages, new ChatMessage('bot', data.generation)]);
        }
    }, [isSuccess]);

    if (isFetching) {
        return <Text> Loading... </Text>
    }

    if (isError) {
        return <Text> Error: {error.message} </Text>
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
