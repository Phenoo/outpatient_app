import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import OtpForm from '~/components/Otpform';
import Colors from '~/constants/Colors';

const Pageindex = () => {
  const router = useRouter();

  return (
      <SafeAreaView style={styles.container}>
        <View>
        <View style={{ margin: 20}}>
      <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
            <Entypo name="chevron-small-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ margin: 20  }}>
        <Text style={styles.text}>
          Verification
        </Text>
        <Text style={{ textAlign: "center", color: "black", fontSize: 16, opacity: 0.7, marginBottom: 20 }}>
          Enter Verification code
        </Text>
        <OtpForm />
        <TouchableOpacity style={styles.click} onPress={() => router.push("/(app)/location/")}>
          <Text style={{textAlign: "center", fontFamily: "extrabold", color: "white", fontSize: 20}}>
           Verify
          </Text>
        </TouchableOpacity>

      </View>
        </View>
      </SafeAreaView>
  )
}

export default Pageindex

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        opacity: 0.8
      },
      container: {
        backgroundColor: "rgba(119, 97, 255, 0.2)",
        flex: 1,
        paddingHorizontal: 20
    
      },
      btn: {
        width: 45,
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 10,
        justifyContent: "center",
    },
      text: {
        fontSize: 35,
        fontFamily: "extrabold",
        color: "black",
        textAlign: "center",
        // fontWeight: "bold"
      },
      small: {
        fontSize: 18,
        opacity: 0.7
      },
      click: {
        backgroundColor: "#7a5bff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 7,
        marginTop: 40,
      },
      link: {
        color: "#111111",
        fontFamily: "bold",
        fontSize: 18,
        textTransform: "capitalize"
      },
      input:{
        backgroundColor: "#848290",
        color: "#111",
        padding: 16,
        borderRadius: 5
      },
      apple: {
        backgroundColor: "white",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        padding: 15,
        borderRadius: 10
      },
      google: {
        backgroundColor: "black",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        padding: 15,
        borderRadius: 10
      }
})