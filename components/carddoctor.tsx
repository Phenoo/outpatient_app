import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Button } from './ui';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

const Carddoctor = ({ item }: any) => {
  const router = useRouter();
  const imagesPicture = [
    'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3902881/pexels-photo-3902881.jpeg?auto=compress&cs=tinysrgb&w=600',

    'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9jdG9yfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9jdG9yfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D',
  ];
  return (
    <View className="my-1 bg-white p-2">
      <View className="flex gap-2 flex-row mb-2">
        <View>
          <Image
            source={{
              uri: imagesPicture[item?.id],
            }}
            width={100}
            height={100}
            resizeMode="cover"
            className="rounded-lg"
            style={{
              width: 80,
              height: 80,
            }}
          />
        </View>
        <View className="flex flex-col flex-1 justify-between mb-2">
          <View className="flex flex-row justify-between">
            <View>
              <Text style={{ fontFamily: 'bold', fontSize: 16 }}>{item.name}</Text>
              <Text className="capitalize text-gray-500 mt-0.5" style={{ fontFamily: 'medium' }}>
                {item.specialization}
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View className="flex gap-0.5 flex-row">
              <Ionicons name="star" color={'orange'} size={16} />
              <Ionicons name="star" color={'orange'} size={16} />
              <Ionicons name="star" color={'orange'} size={16} />
              <Ionicons name="star" color={'orange'} size={16} />
              <Ionicons name="star-half" color={'orange'} size={16} />
              <Text className="pl-0.5 text-gray-400" style={{ fontFamily: 'medium' }}>
                4.5
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="bg-[#e1dcff] px-2 py-3 rounded-lg"
        onPress={() => router.push(`/(app)/doctor/${item.id}`)}>
        <Text className="text-primary text-center" style={{ fontFamily: 'medium' }}>
          {' '}
          Make Appointment
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Carddoctor;

const styles = StyleSheet.create({});
