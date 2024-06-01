import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Link, Redirect, useRouter } from 'expo-router';
import { useSupabase } from '@/hooks/useSupabase';
import { useEffect, useState } from 'react';
import { supabase } from '@/config/supabase';
import Authheader from '@/components/auth-header';
import GetStarted from '@/components/GetStarted';
import Header from '@/components/header';
import {
  fetchAppointments,
  fetchLabs,
  fetchPremises,
  fetchProvidersByPremise,
  useGetLabs,
  useGetProfile,
  useProvidersByPremise,
} from '@/services/queries';
import { Button } from '@/components/ui';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { Premise, Provider } from '@/typings';
import { FlashList } from '@shopify/flash-list';
import Carddoctor from '@/components/carddoctor';

const Page = () => {
  const { user } = useSupabase();
  const router = useRouter();
  const [premises, setPremises] = useState<Premise[]>([]);
  const [providers, setProviders] = useState<any[]>([]);

  const { data: profile, error, isLoading } = useGetProfile(user?.id);

  const { isError, data, isLoading: loading } = useProvidersByPremise(1294);

  useEffect(() => {
    if (error) {
      router.navigate('/modal');
    }
  }, [profile, error]);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView className="p-2">
        <View className="bg-primary p-4 rounded-lg shadow-xl drop-shadow-2xl">
          <View className="flex justify-between flex-row">
            <View className="flex gap-4 flex-row items-center">
              <View>
                <Image
                  source={{
                    uri: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=600',
                  }}
                  width={50}
                  height={50}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 4,
                  }}
                />
              </View>
              <View>
                <Text style={{ fontFamily: 'medium' }} className="text-lg text-white">
                  Dr. Kumugash Kenny
                </Text>
                <Text style={{ fontFamily: 'medium' }} className="text-white text-xs">
                  Biochemist
                </Text>
              </View>
            </View>
            <View>
              <Button className="bg-white rounded-full w-12 h-12 flex items-center">
                <Ionicons name="videocam" size={20} color={'#7761FF'} />
              </Button>
            </View>
          </View>

          <View className="my-4 p-4 flex flex-row justify-between bg-[#8875FF] rounded-lg text-white">
            <View>
              <Text className="text-white" style={{ fontFamily: 'medium' }}>
                <FontAwesome6 name="calendar-alt" size={20} color="white" />
                {'  '}
                Wednesday, 01, 2024
              </Text>
            </View>
            <View>
              <Text className="text-white" style={{ fontFamily: 'medium' }}>
                <Feather name="clock" size={18} color="white" />
                {'  '}
                10.00am
              </Text>
            </View>
          </View>
        </View>
        <View className="my-6 ">
          <View className="flex justify-between flex-row">
            <Text style={{ fontFamily: 'bold' }} className="text-lg">
              Available Doctors
            </Text>
            <Link
              href={'/(app)/all-doctors'}
              className="text-primary"
              style={{ fontFamily: 'medium' }}>
              See All
            </Link>
          </View>
          <View>
            {data && data.length > 0 ? (
              data.map((item, i) => <Carddoctor key={i} item={item} />)
            ) : loading ? (
              <View className="my-8">
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <View>
                <Text style={{ fontFamily: 'medium', fontSize: 16 }}>No Doctors Available</Text>
              </View>
            )}
            {isError && (
              <Text style={{ fontFamily: 'medium', fontSize: 16 }}>No Doctors Available</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FAF9FF',
  },
  separator: {
    backgroundColor: '#d1d5db',
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
