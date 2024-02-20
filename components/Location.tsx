import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '~/constants/Colors'
import { useRouter } from 'expo-router'


const Location = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <View>
       <View style={{ height: "auto" }}>
        <Image 
          source={{ uri:  "https://res.cloudinary.com/dnir0cslk/image/upload/v1708318342/undraw_Location_tracking_re_n3ok_uruttt.png"}}
          style={styles.image}
          resizeMode='contain'
        />
       </View>
        <Text style={{ color: Colors.brown, fontSize: 16, textAlign: "center" }}>
          Allow Komot to access your location settings to you can see nearby doctors.
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.btn} onPress={() => router.push("/verify/")}>
          <Text style={{ textAlign: "center", color: Colors.white, fontSize: 16 }}>
            Enable location services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lightbtn} onPress={() => router.push("/(app)/(drawer)/(tabs)")}>
          <Text style={{ textAlign: "center", color: Colors.black, fontSize: 16 }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Location

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: "space-between",
    height: "100%",
    paddingBottom: 5
    // flex: 1
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },
  lightbtn: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.black,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    color: Colors.black
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  }
})