import { Button, Text } from "react-native-paper"
import React, { useEffect } from "react"

import HealthInformationView from "./HealthInformaionView/HealthInformationView"
import { MainBottomTabScreenProps } from "@/navigators/navigation"
import ProfileIcon from "./ProfileIcon"
import ProfileItem from "./ProfileItem"
import { SafeScreen } from "@/components/template"
import { ScrollView } from "react-native"
import User from "@/models/User"
import i18next from "i18next"
import sampleUser from "@/sample-data/sample-user"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import useViewModel from "./useViewModel"

const ProfileScreen = ({ navigation }: MainBottomTabScreenProps) => {
    const { t } = useTranslation(["profileScreen"])

    const fetchUsers = async () => {
        const response = await fetch(
            "https://whippet-one-brightly.ngrok-free.app/users/get/1"
        )
        if (!response.ok) {
            throw new Error("Failed to fetch users")
        }
        return response.json()
    }

    const { data, isSuccess, isFetching, isError, error } = useQuery({
        queryKey: ["profile"],
        queryFn: fetchUsers,
    })

    const user: User = sampleUser
    const viewModel = useViewModel()
    const { styles } = viewModel

    const onChangeLanguage = (lang: "zh" | "en") => {
        void i18next.changeLanguage(lang)
    }

    const ButtonsContainer = () => (
        <>
            <Button
                mode="text"
                style={styles.languageSwitchButton}
                contentStyle={styles.languageSwitchContent}
                textColor="blue"
                buttonColor="#fff"
                onPress={() =>
                    onChangeLanguage(i18next.language === "en" ? "zh" : "en")
                }
            >
                {t("profileScreen:switchLanguage")}
            </Button>
            <Button
                mode="text"
                style={styles.logoutButton}
                contentStyle={styles.logoutContent}
                textColor="red"
                buttonColor="#fff"
                // onPress={onPress}
            >
                {t("profileScreen:signOut")}
            </Button>
        </>
    )

    // TODO: Give a pop up window to show update the data successfully.
    useEffect(() => {
        console.log("The value of isSuccess is: ", isSuccess)
        if (isSuccess) console.log("The user data is: ", data)
    }, [isSuccess])

    if (isFetching) {
        return (
            <Text style={styles.menuItemTitle}>
                {" "}
                {t("profileScreen:loading")}{" "}
            </Text>
        )
    }

    if (isError) {
        return (
            <SafeScreen>
                <Text style={styles.menuItemTitle}>
                    {t("profileScreen:error")} {error.message}{" "}
                </Text>
                <ButtonsContainer />
            </SafeScreen>
        )
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
                <ButtonsContainer />
            </ScrollView>
        </SafeScreen>
    )
}

export default ProfileScreen
