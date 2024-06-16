import { Button, Text } from "react-native-paper"
import HealthInformationView from "./HealthInformaionView/HealthInformationView"
import { MainBottomTabScreenProps } from "@/navigators/navigation"
import ProfileIcon from "./ProfileIcon"
import ProfileItem from "./ProfileItem"
import React, { useEffect } from "react"
import { SafeScreen } from "@/components/template"
import { ScrollView } from "react-native"
import User from "@/models/User"
import sampleUser from "@/sample-data/sample-user"
import { useQuery } from '@tanstack/react-query';
import useViewModel from "./useViewModel"

const ProfileScreen = ({ navigation }: MainBottomTabScreenProps) => {

    const fetchUsers = async () => {
        const response = await fetch('https://whippet-one-brightly.ngrok-free.app/users/get/1');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    };

    const {
        data,
        isSuccess,
        isFetching,
        isError,
        error,
    } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchUsers,
    });

    const user: User = sampleUser
    const viewModel = useViewModel()
    const { styles } = viewModel

    // TODO: Give a pop up window to show update the data successfully.
    useEffect(() => {
        console.log("The value of isSuccess is: ", isSuccess);
        if(isSuccess)
            console.log("The user data is: ", data);
    }, [isSuccess]);

    if (isFetching) {
        return <Text style={styles.menuItemTitle}> Loading... </Text>
    }

    if (isError) {
        return <Text style={styles.menuItemTitle}> Error: {error.message} </Text>
    }

    return (
        <SafeScreen>
            <ScrollView style={styles.container}>
                <ProfileIcon />
                <ProfileItem title={"User ID"} description={data.userId} />
                <ProfileItem title={"Name"} description={data.name} />
                <ProfileItem title={"Email"} description={data.email} />
                <ProfileItem title={"Phone"} description={data.phone} />
                <ProfileItem title={"Age"} description={data.age} />
                <ProfileItem title={"Gender"} description={data.gender} />
                {/* <ProfileItem title={"Height"} description={user.height + " cm"} />
            <ProfileItem title={"Weight"} description={user.weight + " kg"} /> */}
                <HealthInformationView />
                <Button
                    mode="text"
                    style={styles.languageSwitchButton}
                    contentStyle={styles.languageSwitchContent}
                    textColor="blue"
                    buttonColor="#fff"
                >
                    Switch Language
                </Button>
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
        </SafeScreen>
    )
}

export default ProfileScreen
