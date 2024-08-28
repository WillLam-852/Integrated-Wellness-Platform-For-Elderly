import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Text } from "react-native-paper"
import { View } from "react-native"
import useViewModel from "./useViewModel"

interface Props {
    title: string
    description?: string
    value?: number
    unit: string
    titleColor: string
    iconName: string
}

const HealthValueView = ({
    title,
    description,
    value,
    unit,
    titleColor,
    iconName,
}: Props) => {
    const viewModel = useViewModel({ titleColor })
    const { styles } = viewModel

    if (value === undefined) return undefined

    return (
        <View style={styles.root}>
            <View style={styles.row}>
                <MaterialIcons name={iconName} size={30} color={titleColor} />
                <Text style={styles.title}>{title}</Text>
            </View>
            {description ? (
                <Text style={styles.description}>{description}</Text>
            ) : undefined}
            <View style={styles.row}>
                <Text style={styles.value}>{value}</Text>
                <Text style={styles.unit}>{unit}</Text>
            </View>
        </View>
    )
}

export default HealthValueView
