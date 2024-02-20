import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '~/constants/Colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const Registerform = () => {
    const router = useRouter()
  return (
    <View style={{ marginTop: 33, gap: 20, flexDirection: "column", justifyContent: "space-between", flex: 1, paddingBottom: 30 }}>
        <View style={{  gap: 20 }}>
             <View style={{ position: "relative", gap: 4 }}>
            <Text style={styles.text}>Full name</Text>
            <TextInput style={styles.input} />
            <View style={{ position: "absolute", right: 10, top: 33 }}>
                <FontAwesome name='user' color={Colors.brown} size={20} />
            </View>
            </View>
            <View style={{ position: "relative", gap: 4 }}>
            <Text style={styles.text}>Email Address</Text>
            <TextInput style={styles.input} />
            <View style={{ position: "absolute", right: 10, top: 33 }}>
                <Ionicons name='mail' color={Colors.brown} size={20} />
            </View>
            </View>
            <View style={{ position: "relative", gap: 4 }}>
            <Text style={styles.text}>Date Of birth</Text>
            <TextInput style={styles.input}  />
            <View style={{ position: "absolute", right: 10, top: 33 }}>
                <FontAwesome name='calendar' color={Colors.brown} size={20} />
            </View>
            </View>
            <View style={{ position: "relative", gap: 4 }}>
            <Text style={styles.text}>Phone Number</Text>
            <TextInput style={styles.input} keyboardType='phone-pad' />
            <View style={{ position: "absolute", right: 10, top: 33 }}>
                <FontAwesome name='phone' color={Colors.brown} size={20} />
            </View>
            </View>
            <View style={{ position: "relative", gap: 4 }}>
            <Text style={styles.text}>Gender</Text>
            <TextInput style={styles.input} />
            <View style={{ position: "absolute", right: 10, top: 33 }}>
                <FontAwesome name='genderless' color={Colors.brown} size={20} />
            </View>
            </View>
       </View>

        <TouchableOpacity style={styles.btn} onPress={() => router.push("/(auth)/verify")}>
          <Text style={{ textAlign: "center", color: Colors.white, fontSize: 16 }}>
            Continue
          </Text>
        </TouchableOpacity>
    </View>
  )
}

export default Registerform

const styles = StyleSheet.create({
    input: {
        borderColor: Colors.primary,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
      },
      text: {
        color: Colors.brown,
        fontWeight: "500",
        fontSize: 16,
        textTransform: "capitalize"
      },
      btn: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 10,
        marginTop: 20
      },
})