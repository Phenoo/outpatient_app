import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSupabase } from '@/hooks/useSupabase';
import { useRouter } from 'expo-router';
import { supabase } from '@/config/supabase';
import { Button } from './ui';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useGetProfile } from '@/services/queries';

const Header = () => {
  const [formData, setFormData] = useState({});
  const [greeting, setGreeting] = useState('');
  const { user } = useSupabase();

  const { data: profile, error, isLoading } = useGetProfile(user?.id);

  const router = useRouter();

  useEffect(() => {
    // Get the current hour using the Date object
    const currentHour = new Date().getHours();

    // Determine the appropriate greeting based on the current hour
    let newGreeting = '';
    if (currentHour >= 5 && currentHour < 12) {
      newGreeting = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      newGreeting = 'Good afternoon';
    } else {
      newGreeting = 'Good evening';
    }

    // Update the state with the new greeting
    setGreeting(newGreeting);
  }, []); // Empty dependency array to ensure this effect runs only once on component mount

  return (
    <SafeAreaView>
      <View className="flex justify-between flex-row py-4 px-2">
        <View className="flex gap-1 flex-row items-center">
          <View>
            <Image
              source={require('../assets/avatar.png')}
              width={50}
              height={50}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
              }}
            />
          </View>
          <View>
            <Text style={{ fontFamily: 'regular' }} className="text-base">
              {greeting}
            </Text>
            <Text style={{ fontFamily: 'bold' }} className="font-semibold text-base">
              {profile?.full_name}
            </Text>
          </View>
        </View>
        <View>
          <Button variant={'ghost'} className="bg-white">
            <MaterialCommunityIcons name="bell-ring-outline" size={20} color={'#7761FF'} />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({});
