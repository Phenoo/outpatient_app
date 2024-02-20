import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '~/constants/Colors'
import Authheader from '~/components/auth-header'

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';


const LoginPage = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Authheader title='Sign up to komoto' subtitle='Enter your mobile number to signup.' />
      <View style={{marginTop: 20}}> 
        <TextInput style={styles.input} placeholder='Enter your phone number' placeholderTextColor={Colors.black} />

        <TouchableOpacity style={styles.btn} onPress={() => router.push("/(drawer)")}>
          <Text style={{ textAlign: "center", color: Colors.white, fontSize: 16 }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.speratorView}>
          <View 
            style={{
              flex: 1,
              borderBottomColor: "#000",
              borderBottomWidth: StyleSheet.hairlineWidth
            }}  
          />
          <Text style={styles.separator}>
            or          
          </Text>
          <View 
            style={{
              flex: 1,
              borderBottomColor: "#000",
              borderBottomWidth: StyleSheet.hairlineWidth
            }}  
          />
        </View>

        <View style={{ gap: 15 }}>
          <TouchableOpacity style={styles.continue}>
          <FontAwesome name="google" size={24} color="green" />
            <Text style={{ fontSize: 16 }}>
              Continue with Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continue}>
          <FontAwesome5 name="facebook" size={24} color="blue" />
            <Text style={{ fontSize: 16 }}>
              Continue with Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continue}>
          <FontAwesome name="apple" size={24} color="black" />
            <Text style={{ fontSize: 16 }}>
              Continue with Apple
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 30 }}>
          <Link href={"/register/"}>
            <Text style={{ textAlign: "center", fontWeight: "500" }}>
              Don't have an account? Register
            </Text>
          </Link>
        </View>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(119, 97, 255, 0.1)",
    flex: 1,
    paddingHorizontal: 20
  },
  input: {
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },
  speratorView: {
    flexDirection: "row",
    gap:10,
    alignItems: "center",
    marginVertical: 30
  }, 
  seperator: {
    color: Colors.brown
  },
  continue: {
    padding: 10,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    borderRadius: 15,
  }
})