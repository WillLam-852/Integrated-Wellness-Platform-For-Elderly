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
            padding: 16,
            backgroundColor: "#cbf5dd",
        },
        title: {
            marginTop: 25,
            fontSize: 35,
            textAlign: "center",
            fontWeight: "bold",
            alignSelf: "center",
        },
        logo: {
            width: 150,
            height: 150,
            marginTop: 25,
            marginBottom: 50,
            alignSelf: "center",
        },
        input: {
            height: 50,
            marginBottom: 12,
            marginHorizontal: 20,
            paddingHorizontal: 8,
        },
        button: {
            marginTop: 30,
            marginHorizontal: 20,
        },
        buttonLabel: {
            fontWeight: "bold",
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
