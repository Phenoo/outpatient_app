import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Colors from '~/constants/Colors';
import { useRouter } from 'expo-router';

const LocationAuthheader = () => {
    const router = useRouter()
  return (
    <View>
        <View style={styles.header}>
        <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
            <Entypo name="chevron-small-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>
            Get Started
        </Text>
        <TouchableOpacity style={styles.btn}>
            <Feather name="info" size={24} color="black" />
        </TouchableOpacity>
        </View>

        
    </View>
  )
}

export default LocationAuthheader

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
    btn: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 10,
        justifyContent: "center",
    },
    center: {
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
        gap: 4
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitle: {
        color: Colors.brown,
        fontSize: 16,
        textAlign: "center",
    }
})