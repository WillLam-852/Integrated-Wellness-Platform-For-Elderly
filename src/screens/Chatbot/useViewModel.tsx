import { useEffect, useState } from "react"
import { StyleSheet } from "react-native";

const useViewModel = () => {

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    messagesContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    message: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 4,
        maxWidth: '80%',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E4E6EB',
    },
    messageText: {
        fontSize: 16,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginRight: 8,
        backgroundColor: '#fff',
    },
    sendButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    sendButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });

  return {
    inputText,
    setInputText,
    messages,
    styles,
  }

}

export default useViewModel