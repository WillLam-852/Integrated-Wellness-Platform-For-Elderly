import AntDesign from "react-native-vector-icons/AntDesign"
import { Button } from "react-native-paper"
import { MainBottomTabScreenProps } from "@/navigators/navigation"
import ProfileIcon from "./ProfileIcon"
import ProfileItem from "./ProfileItem"
import React from "react"
import { ScrollView } from "react-native"
import User from "@/models/User"
import sampleUser from "@/sample-data/sample-user"
import useViewModel from "./useViewModel"

const ProfileScreen = ({ navigation }: MainBottomTabScreenProps) => {
    const user: User = sampleUser
    const viewModel = useViewModel()
    const { styles } = viewModel

    return (
        <ScrollView style={styles.container}>
            <ProfileIcon />
            <ProfileItem title={"User ID"} description={user.id} />
            <ProfileItem title={"Name"} description={user.name} />
            <ProfileItem title={"Email"} description={user.email} />
            <ProfileItem title={"Phone"} description={user.phone} />
            <ProfileItem title={"Age"} description={user.age} />
            <ProfileItem title={"Gender"} description={user.gender} />
            <ProfileItem title={"Height"} description={user.height + " cm"} />
            <ProfileItem title={"Weight"} description={user.weight + " kg"} />
            <Button
                mode="text"
                style={styles.logoutButton}
                contentStyle={styles.logoutContent}
                textColor="red"
                buttonColor="#fff"
                // onPress={onPress}
            >
                Sign Out
            </Button>
        </ScrollView>
    )
}

export default ProfileScreen
