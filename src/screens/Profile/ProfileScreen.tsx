import { Button, Text } from "react-native-paper"
import React, { useEffect } from "react"
import { ScrollView, View, ActivityIndicator } from "react-native"

import HealthInformationView from "./HealthInformaionView/HealthInformationView"
import { MainBottomTabScreenProps } from "@/navigators/navigation"
import ProfileIcon from "./ProfileIcon"
import ProfileItem from "./ProfileItem"
import { SafeScreen } from "@/components/template"
import User from "@/models/User"
import i18next from "i18next"
import sampleUser from "@/sample-data/sample-user"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import useViewModel from "./useViewModel"
import { baseURL } from "../../redux/baseURL"

const ProfileScreen = ({ navigation }: MainBottomTabScreenProps) => {
    const { t } = useTranslation(["profileScreen"])

    const fetchUsers = async () => {
        const response = await fetch(
            `${baseURL}/users/get/1`
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
    const { signOutOnPress, styles } = viewModel

    const onChangeLanguage = (lang: "zh" | "en") => {
        void i18next.changeLanguage(lang)
    }

    const ButtonsContainer = () => (
        <View style={styles.buttonsContainer}>
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
                onPress={signOutOnPress}
            >
                {t("profileScreen:signOut")}
            </Button>
        </View>
    )

    useEffect(() => {
        console.log("The value of isSuccess is: ", isSuccess)
        if (isSuccess) console.log("The user data is: ", data)
    }, [isSuccess])

    if (isFetching) {
        return (
            <SafeScreen>
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator size="large" color="#90B44B"/>
                    <Text style={styles.menuItemTitle}>
                        {t("profileScreen:loading")}
                    </Text>
                </View>
                <ButtonsContainer />
            </SafeScreen>
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
                <ProfileItem title={t("profileScreen:userId")} description={data.data.userId} />
                <ProfileItem title={t("profileScreen:name")} description={data.data.name} />
                <ProfileItem title={t("profileScreen:email")} description={data.data.email} />
                <ProfileItem title={t("profileScreen:phone")} description={data.data.phone} />
                <ProfileItem title={t("profileScreen:age")} description={data.data.age} />
                <ProfileItem title={t("profileScreen:gender")} description={data.data.gender} />
                {/* <ProfileItem title={"Height"} description={user.height + " cm"} />
            <ProfileItem title={"Weight"} description={user.weight + " kg"} /> */}
                <HealthInformationView />
                <ButtonsContainer />
            </ScrollView>
        </SafeScreen>
    )
}

export default ProfileScreen
