import { StyleSheet } from "react-native"

interface Props {
    titleColor: string
}

const useViewModel = ({ titleColor }: Props) => {
    const styles = StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: "#f9f9f9",
            borderColor: "#ddd",
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginVertical: 10,
        },
        row: {
            flexDirection: "row",
        },
        title: {
            color: titleColor,
            fontSize: 30,
            fontWeight: "bold",
            marginLeft: 5,
            marginBottom: 10,
        },
        description: {
            fontSize: 20,
            fontWeight: "normal",
            color: "gray",
        },
        value: {
            fontSize: 30,
            fontWeight: "bold",
        },
        unit: {
            fontSize: 30,
            fontWeight: "normal",
            color: "gray",
            marginHorizontal: 10,
        },
    })
    return { styles }
}

export default useViewModel
