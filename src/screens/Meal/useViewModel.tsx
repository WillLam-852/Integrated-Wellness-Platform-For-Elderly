import { useEffect, useState } from "react"
import { StyleSheet } from "react-native";

const useViewModel = () => {
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginBottom: 10,
        color: '#90B44B',
    },
    subHeader: {
        fontSize: 16,
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    list: {
        paddingLeft: 16,
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginRight: 16,
        padding: 10,
        alignItems: 'center',
        width: 200,
        height: 355,
        borderColor: '#ddd',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 90,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: '#90B44B',
    },
    calories: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginVertical: 8,
    },
    seeMore: {
        fontSize: 14,
        color: '#007AFF',
        textAlign: 'right',
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    restaurantList: {
        paddingHorizontal: 16,
        marginVertical: 24,
    },
    restaurantCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 16,
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    restaurantImage: {
        width: 150,
        height: 150,
        borderRadius: 5,
        marginRight: 5,
    },
    restaurantTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'left',
        color: '#90B44B',
    },
    restaurantCategory:{
        fontSize: 16,
        marginBottom: 10,
    },
    restaurantDescription:{
        fontSize: 14,
        color: '#666',
        textAlign: 'left',
        marginVertical: 8,
    },
    restaurantTextContainer: {
        flex: 1,
    },
  });
  
  return {
    styles,
  }
};

export default useViewModel;