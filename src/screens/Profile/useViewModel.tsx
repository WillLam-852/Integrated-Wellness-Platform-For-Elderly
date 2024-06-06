import { Platform, StyleSheet } from "react-native"

import askPermission from "@/services/healthInformation/healthInformationPermission"
import { fetchAllFromHealthKit } from "@/services/healthInformation/healthInformationGetter"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

const useViewModel = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (Platform.OS == "ios") {
            askPermission()
            fetchAllFromHealthKit(dispatch)
        }
    }, [])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
        },
        menuItem: {
            borderBottomColor: "#DDDDDD",
            borderBottomWidth: 1,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
        },
        menuItemTitle: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#90B44B",
        },
        menuItemDescription: {
            fontSize: 20,
        },
        logoutButton: {
            marginTop: 15,
            borderRadius: 15,
            elevation: 2,
            marginBottom: 40,
        },
        logoutContent: {
            borderColor: "#ff0000",
            borderWidth: 1,
            borderRadius: 15,
        },
        icon: {
            borderRadius: 100 / 2,
            width: 100,
            height: 100,
            borderColor: "#90B44B",
            borderWidth: 5,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff0",
        },
    })

    return {
        styles,
    }
}

export default useViewModel
