import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"
import {
    getRecommendMealImage,
    getRecommendRestaurantImage,
    getRecommendRestaurantLogoImage,
} from "@/resources/images"

import { MainBottomTabScreenProps } from "@/navigators/navigation"
import React from "react"
import RecommendMeal from "@/models/RecommendMeal"
import RecommendRestaurant from "@/models/RecommendRestaurant"
import { SafeScreen } from "@/components/template"
import sampleRecommendMeal from "@/sample-data/sample-recommendmeal"
import sampleRestaurants from "@/sample-data/sample-recommendrestaurant"
import useViewModel from "./useViewModel"
import { useTranslation } from "react-i18next"

const MealScreen = ({ navigation }: MainBottomTabScreenProps) => {

    const { t } = useTranslation(['mealScreen']);
    const { styles } = useViewModel()

    const renderRecommendedMealItem = ({ item }: { item: RecommendMeal }) => (
        <View style={styles.card}>
            <Image
                source={getRecommendMealImage(item.id)}
                style={styles.image}
            />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.calories}>{item.calories} {t('mealScreen:calories')}</Text>
            <Text style={styles.description}>"{item.description}"</Text>
            <TouchableOpacity>
                <Text style={styles.seeMore}>{t('mealScreen:seeMore')}</Text>
            </TouchableOpacity>
        </View>
    )

    const renderRestaurantDicountItem = ({
        item,
    }: {
        item: RecommendRestaurant
    }) => (
        <TouchableOpacity
            style={styles.restaurantDiscountCard}
            onPress={() => {}}
        >
            <Image
                source={getRecommendRestaurantLogoImage(item.id)}
                style={styles.restaurantImage}
            />
            <View style={styles.restaurantDiscountTextContainer}>
                <Text style={styles.restaurantDiscountTitle}>
                    {item.discount[0].discountPercentage}% OFF
                </Text>
                <Text style={styles.restaurantDiscountTerm}>
                    {item.discount[0].terms}
                </Text>
                <Text style={styles.restanrantDiscountEndDate}>
                    {item.discount[0].validUntil}
                </Text>
            </View>
        </TouchableOpacity>
    )

    const RecommendedRestaurantItem = ({
        item,
    }: {
        item: RecommendRestaurant
    }) => (
        <TouchableOpacity style={styles.restaurantCard} onPress={() => {}}>
            <View style={styles.restaurantTextContainer}>
                <Text style={styles.restaurantTitle}>{item.name}</Text>
                <Text style={styles.restaurantCategory}>{item.category}</Text>
                <Text style={styles.restaurantDescription}>
                    {item.description}
                </Text>
            </View>
            <Image
                source={getRecommendRestaurantImage(item.id)}
                style={styles.restaurantImage}
            />
        </TouchableOpacity>
    )

    return (
        <SafeScreen>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>
                    {t('mealScreen:recommendMealSectionTitle')}
                </Text>
                <Text style={styles.subHeader}>
                    {t('mealScreen:recommendMealSectionSubTitle')}
                </Text>
                <FlatList
                    data={sampleRecommendMeal}
                    renderItem={renderRecommendedMealItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                />
                <Text style={styles.header}>
                    {t('mealScreen:recommendRestaurantSectionTitle')}
                </Text>
                <Text style={styles.subHeader}>{t('mealScreen:recommendRestaurantSectionSubtitle')}</Text>
                <View style={styles.restaurantList}>
                    {sampleRestaurants.map((item) => (
                        <RecommendedRestaurantItem key={item.id} item={item} />
                    ))}
                </View>
                <Text style={styles.header}>{t('mealScreen:discountSectionTitle')}</Text>
                <Text style={styles.subHeader}>{t('mealScreen:discountSectionSubTitle')}</Text>
                <FlatList
                    data={sampleRestaurants}
                    renderItem={renderRestaurantDicountItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                />
            </ScrollView>
        </SafeScreen>
    )
}

export default MealScreen
