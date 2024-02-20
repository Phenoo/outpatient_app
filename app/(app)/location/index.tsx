import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Authheader from '~/components/auth-header'
import LocationAuthheader from '~/components/LocationHead'
import Location from '~/components/Location'

const LocationPage = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={{ padding: 20, flex: 1}}>
            <LocationAuthheader />
            <Location />
        </View>
    </SafeAreaView>
  )
}

export default LocationPage


const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(119, 97, 255, 0.2)",
        flex: 1,
        paddingHorizontal: 20
          },
})