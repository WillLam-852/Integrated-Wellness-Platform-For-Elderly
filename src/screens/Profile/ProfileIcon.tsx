import { Avatar } from "react-native-paper"
import { getProfileIcon } from "@/resources/images"
import useViewModel from "./useViewModel"

const ProfileIcon = ({}) => {
    const viewModel = useViewModel()
    const { styles } = viewModel

    return (
        <Avatar.Icon style={styles.icon} icon={getProfileIcon()} size={100} />
    )
}

export default ProfileIcon
