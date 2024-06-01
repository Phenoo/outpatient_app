import Header from '@/components/header';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function AppLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontFamily: 'regular',
        },
      }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="messages/[id]/index"
        options={{
          headerShown: true,
          title: '',
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                width: 220,
                alignItems: 'center',
                gap: 10,
                paddingBottom: 4,
              }}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600',
                }}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Doctor</Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <TouchableOpacity>
                <Ionicons name="videocam-outline" color={Colors.primary} size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="call-outline" color={Colors.primary} size={30} />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />
      <Stack.Screen
        name="doctor/[id]/index"
        options={{
          headerShown: true,
          title: '',
          headerBackTitleVisible: false,
          headerTitle: () => (
            <Text style={{ fontFamily: 'bold', fontSize: 16 }}>Doctor Appointment</Text>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 20, margin: 10 }}>
              <TouchableOpacity>
                <Ionicons name="heart-outline" color={Colors.primary} size={24} />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{ flexDirection: 'row', gap: 20, marginHorizontal: 10 }}>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" color={Colors.primary} size={22} />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />
      <Stack.Screen
        name="labs/index"
        options={{
          presentation: 'fullScreenModal',
          headerShown: true,
          title: 'Labs',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text>
                <Ionicons name="chevron-back" size={20} />
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="all-doctors/index"
        options={{
          presentation: 'fullScreenModal',
          headerShown: true,
          title: 'All Doctors',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text>
                <Ionicons name="chevron-back" size={20} />
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
