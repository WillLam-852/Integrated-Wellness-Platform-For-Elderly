import { List } from "react-native-paper"
import useViewModel from "./useViewModel"

const ProfileItem = ({
    title,
    description,
}: {
    title: string
    description: string | number
}) => {
    const viewModel = useViewModel()
    const { styles } = viewModel

    return (
        <List.Item
            title={title}
            description={description}
            style={styles.menuItem}
            titleStyle={styles.menuItemTitle}
            descriptionStyle={styles.menuItemDescription}
        />
    )
}

export default ProfileItem
