import { StyleSheet, TouchableOpacity } from "react-native"

import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"

const BackButton = () => {
    const navigation = useNavigation()

    const handleBackPress = () => {
        navigation.goBack()
    }

    return (
        <TouchableOpacity onPress={handleBackPress} style={styles.button}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 16,
    },
})

export default BackButton
