import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import { MainBottomTabScreenProps } from "@/navigators/navigation"
import { SafeScreen } from "@/components/template"
import i18next from "i18next"
import { useTheme } from "@/theme"
import { useTranslation } from "react-i18next"
import useViewModel from './useViewModel';

function ChatbotScreen({ navigation }: MainBottomTabScreenProps) {
    const { t } = useTranslation()

    const {
        inputText,
        setInputText,
        messages,
        styles,
    } = useViewModel()

    const { colors, variant, changeTheme, layout, gutters, fonts, components, backgrounds } = useTheme()

    return (
        <SafeScreen>
            <ScrollView contentContainerStyle={styles.container}>                
                <View style={styles.messagesContainer}>
                    {messages.map((message, index) => (
                        <View key={index} style={[styles.message, message.type === 'user' ? styles.userMessage : styles.botMessage]}>
                            <Text style={styles.messageText}>{message.text}</Text>
                        </View>
                    ))}
                </View>

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
            </ScrollView>
        </SafeScreen>
    )
}

export default ChatbotScreen
