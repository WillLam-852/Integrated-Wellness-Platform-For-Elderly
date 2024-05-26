import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeScreen } from "@/components/template"
import sampleRecommendMeal from '@/sample-data/sample-recommendmeal';
import sampleRestaurants from '@/sample-data/sample-recommendrestaurant';
import useViewModel from './useViewModel';
import RecommendMeal from '@/models/RecommendMeal';
import { getRecommendMealImage, getRecommendRestaurantImage } from '@/resources/images';
import RecommendRestaurant from '@/models/RecommendRestaurant';

const MealScreen = ({ navigation }: MainBottomTabScreenProps) => {

    const {
        styles
    } = useViewModel();

    const renderRecommendedMealItem = ({ item }: { item: RecommendMeal }) => (
        <View style={styles.card}>
            <Image source={getRecommendMealImage(item.id)} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.calories}>{item.calories} Calories</Text>
            <Text style={styles.description}>"{item.description}"</Text>
            <TouchableOpacity>
                <Text style={styles.seeMore}>See More</Text>
            </TouchableOpacity>
        </View>
    );

    const RecommendedRestaurantItem = ({ item }: { item: RecommendRestaurant }) => (
        <TouchableOpacity style={styles.restaurantCard} onPress={() => {}}>
            <View style={styles.restaurantTextContainer}>
                <Text style={styles.restaurantTitle}>{item.name}</Text>
                <Text style={styles.restaurantCategory}>{item.category}</Text>
                <Text style={styles.restaurantDescription}>{item.description}</Text>
            </View>
            <Image source={getRecommendRestaurantImage(item.id)} style={styles.restaurantImage} />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Let's Check Food Nutrition & Calories</Text>
            <Text style={styles.subHeader}>Select food type to see calories</Text>
            <FlatList
                data={sampleRecommendMeal}
                renderItem={renderRecommendedMealItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
            />
            <Text style={styles.header}>Let's See Recommend Restaurants</Text>
            <Text style={styles.subHeader}>Your health matters</Text>
            <View style={styles.restaurantList}>
                { sampleRestaurants.map((item) => (
                    <RecommendedRestaurantItem key={item.id} item={item}/>
                ))}
            </View>
            <Text style={styles.header}>Get Discount And Stay Healthy</Text>
            <Text style={styles.subHeader}>See the promotion</Text>
        </ScrollView>
    );
}

export default MealScreen
