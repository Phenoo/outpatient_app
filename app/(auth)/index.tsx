import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '~/constants/Colors';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      // HACK: This is a workaround for the SafeAreaView className prop not working
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: '#FAF9FF',
        flex: 1,
      }}>
      <View className="flex flex-1 items-center justify-center gap-y-4 text-black">
        <Text
          style={{ fontFamily: 'bold' }}
          className="text-4xl text-foreground font-extrabold tracking-tight lg:text-5xl text-center">
          Welcome to Komoto
        </Text>
        <Text
          style={{ fontFamily: 'regular' }}
          className="text-sm text-muted-foreground text-center">
          A robust and flexible mobile out-patients management system built by desco.
        </Text>
      </View>
      <View className="flex flex-row gap-x-4 justify-center px-4">
        <Pressable
          className="flex-1 bg-black"
          style={styles.btn}
          size="default"
          variant="default"
          onPress={() => {
            router.push('/sign-up');
          }}>
          <Text style={{ fontFamily: 'medium' }} className="text-center text-lg text-white">
            Sign up
          </Text>
        </Pressable>
        <Pressable
          className="flex-1 bg-black"
          style={styles.lightbtn}
          size="default"
          variant="secondary"
          onPress={() => {
            router.push('/sign-in');
          }}>
          <Text style={{ fontFamily: 'medium' }} className="text-center text-lg">
            Sign in
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: 5,
    // flex: 1
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  lightbtn: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.black,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    color: Colors.black,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
});
