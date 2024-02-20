import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Authheader from '~/components/auth-header'
import Registerform from '~/components/Registerform'

const RegisterPage = () => {
  return (
        <View style={styles.container}>
          <Authheader title='Welcome to Komoto' subtitle='Please introduce yourself' />
          <Registerform />
        </View>
  )
}

export default RegisterPage

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(119, 97, 255, 0.2)",
    flex: 1,
    paddingHorizontal: 20

  }
})