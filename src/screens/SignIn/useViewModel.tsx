import { StyleSheet } from "react-native"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { userSignIn } from "@/redux/authentication/slice"

const useViewModel = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const signIn = () => {
        // Perform sign-in logic here using username and password
        dispatch(userSignIn())
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        backgroundImage: {
            flex: 1,
            resizeMode: 'cover', // or 'contain', 'stretch', 'center'
            padding: 16,
            justifyContent: 'center',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: 16,
            paddingVertical: 8,
        },
        languageButton: {
            borderRadius: 12,
            padding: 8,
        },
        languageButtonText: {
            color: "#fff",
            fontWeight: "bold",
        },
        title: {
            fontSize: 32,
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 24,
            color: "#333",
        },
        logo: {
            width: 240,
            height: 240,
            marginBottom: 24,
            alignSelf: "center",
            borderRadius: 120,
        },
        input: {
            height: 48,
            paddingHorizontal: 16,
            fontSize: 16,
            marginVertical: 8,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 2,
        },
        signInButton: {
            marginTop: 32,
            borderRadius: 15,
            elevation: 2,
            marginBottom: 32,
            backgroundColor: "#8E354A",
            paddingVertical: 16,
            alignItems: "center",
        },
        signInButtonLabel: {
            fontWeight: "bold",
            color: "#fff",
            fontSize: 24,
        },
    })

    return {
        username,
        password,
        setUsername,
        setPassword,
        signIn,
        styles,
    }
}

export default useViewModel
