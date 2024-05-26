import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';

import { MainBottomTabScreenProps } from "@/navigators/navigation"
import { SafeScreen } from "@/components/template"
import i18next from "i18next"
import { useTheme } from "@/theme"
import { useTranslation } from "react-i18next"
import useViewModel from './useViewModel';
import { getChatIconImage } from '@/resources/images';
import ChatMessage from '@/models/ChatMessage';

function ChatbotScreen({ navigation }: MainBottomTabScreenProps) {
    const { t } = useTranslation()

    const {
        inputText,
        setInputText,
        messages,
        styles,
    } = useViewModel()

    const { colors, variant, changeTheme, layout, gutters, fonts, components, backgrounds } = useTheme()

    const UserMessage = ({message}: {message: ChatMessage}) => (
        <View style={[styles.messageWrapper, styles.userMessageWrapper]}>
            <View style={[styles.messageTail, styles.userMessageTail]} />
            <View style={[styles.message, styles.userMessage ]}>
                <Text style={styles.messageText}>{message.text}</Text>
            </View>
            <Image source={getChatIconImage(message.type)} style={styles.icon}/>
        </View>
    )

    const BotMessage = ({message}: {message: ChatMessage}) => (
        <View style={[styles.messageWrapper, styles.botMessageWrapper]}>
            <Image source={getChatIconImage(message.type)} style={styles.icon}/>
            <View style={[styles.messageTail, styles.botMessageTail]} />
            <View style={[styles.message, styles.botMessage ]}>
                <Text style={styles.messageText}>{message.text}</Text>
            </View>
        </View>
    )

    return (
        <SafeScreen>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
                <ScrollView contentContainerStyle={styles.messagesContainer}>
                    {messages.map((message, index) => (
                        message.type === 'bot' 
                            ? <BotMessage message={message} key={index}/> 
                            : <UserMessage message={message} key={index}/>
                    ))}
                </ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your message..."
                        value={inputText}
                        onChangeText={setInputText}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={() => {}}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeScreen>
    )
}

export default ChatbotScreen
