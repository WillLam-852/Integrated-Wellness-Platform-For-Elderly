import { useEffect, useState } from "react"

import ChatMessage from "@/models/ChatMessage"
import { StyleSheet } from "react-native"
import sampleChatMessages from "@/sample-data/sample-chat-message"

const useViewModel = () => {
    const [inputText, setInputText] = useState("")
    const [messages, setMessages] = useState<ChatMessage[]>(sampleChatMessages)

    const styles = StyleSheet.create({
        safeContainer: {
            flex: 1,
            backgroundColor: "#fff",
        },
        keyboardAvoidingView: {
            flex: 1,
        },
        messagesContainer: {
            flexGrow: 1,
            padding: 10,
        },
        messageWrapper: {
            flexDirection: "row",
            marginBottom: 10,
            alignItems: "flex-end",
        },
        userMessageWrapper: {
            justifyContent: "flex-end",
        },
        botMessageWrapper: {
            justifyContent: "flex-start",
        },
        messageTail: {
            width: 0,
            height: 0,
            borderTopWidth: 10,
            borderBottomWidth: 10,
            borderLeftWidth: 10,
            borderRightWidth: 0,
            borderStyle: "solid",
            marginBottom: 2,
        },
        userMessageTail: {
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
            borderLeftColor: "#d1e7dd",
            marginRight: -10,
        },
        botMessageTail: {
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
            borderRightColor: "#f8d7da",
            marginLeft: -10,
        },
        message: {
            maxWidth: "80%",
            padding: 10,
            borderRadius: 10,
        },
        userMessage: {
            backgroundColor: "#d1e7dd",
            borderBottomRightRadius: 0,
        },
        botMessage: {
            backgroundColor: "#f8d7da",
            borderBottomLeftRadius: 0,
        },
        messageText: {
            fontSize: 16,
        },
        inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#ddd",
            padding: 10,
        },
        input: {
            flex: 1,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
        },
        sendButton: {
            backgroundColor: "#007bff",
            borderRadius: 5,
            padding: 10,
        },
        sendButtonText: {
            color: "#fff",
            fontSize: 16,
        },
        icon: {
            width: 64,
            height: 64,
            marginHorizontal: 5,
        },
    })

    return {
        inputText,
        setInputText,
        messages,
        setMessages,
        styles,
    }
}

export default useViewModel
