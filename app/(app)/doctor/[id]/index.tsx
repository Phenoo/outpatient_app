import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useProvidersByPremise } from '@/services/queries';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui';
import DateTimePicker from '@react-native-community/datetimepicker';

import { BlurView } from 'expo-blur';
import Toast from 'react-native-toast-message';

import RNPickerSelect from 'react-native-picker-select';
import { supabase } from '@/config/supabase';
import { useSupabase } from '@/hooks/useSupabase';
import Colors from '@/constants/Colors';

const DoctorpAppointment = () => {
  const { isError, data, isLoading: loading } = useProvidersByPremise(1294);
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [text, onChangeText] = useState('');
  const [type, setType] = useState();
  const { user } = useSupabase();
  const [isLoadingx, setLoading] = useState(false);
  const searchById = (id: number) => {
    return data.find((item: any) => item.id === id);
  };

  // Example usage
  const item = searchById(Number(id));

  const handleMail = () => {
    Linking.openURL(`mailto:${item.email}`);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${item.phone}`);
  };
  //   console.log(data);

  //   console.log(foundItem);
  //   console.log(data[id]);

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

  const onSubmit = async () => {
    // Handle form submission to create/update profile
    // Assuming formData contains the form data
    // Example: Create a new profile entry
    if (!time || !date || !text || !type || !id || !user?.id) {
      Alert.alert('Error', 'Please fill in all the fields', [{ text: 'OK' }]);
      return; // Exit the function if any field is empty
    }
    setLoading(true); // Set loading to true when starting form submission

    const { data, error } = await supabase.from('appointment').insert([
      {
        appointment_time: time.toTimeString(),
        appointment_date: date,
        reason: text,
        type: type,
        doctor: id,
        user_id: user?.id,
      },
    ]);
    setLoading(false); // Set loading to false after form submission

    if (error) {
      console.error('Error creating profile:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Hello',
        text2: error.message,
      });
    } else {
      setModalVisible(false);
      Toast.show({
        type: 'success',
        text1: 'Hello',
        text2: 'Appointment scheduled 👋',
      });
      setType(null);
      setTime(new Date());
      setDate(new Date());
      onChangeText('');
      // router.push(`/(app)/(tabs)/`);
    }
  };

  const onChange = ({ type }, selectDate) => {
    if (type === 'set') {
      const currentDate = selectDate;
      setDate(currentDate);
    } else {
    }
  };

  if (loading) {
    return (
      <View className="mt-8">
        <ActivityIndicator color={'#7761FF'} size={'large'} />
      </View>
    );
  }
  return (
    <>
      <View className="relative flex-1">
        <ScrollView className="m-4">
          <View className="flex gap-4 flex-row mb-2 p-2 rounded-lg bg-white">
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
                  width: 130,
                  height: 150,
                }}
              />
            </View>
            <View className="flex flex-col flex-1 justify-between mb-2">
              <View className="">
                <View>
                  <Text style={{ fontFamily: 'bold', fontSize: 20 }}>{item.name}</Text>
                  <Text
                    className="capitalize text-gray-500 mt-0.5 text-base"
                    style={{ fontFamily: 'medium' }}>
                    {item.specialization}
                  </Text>
                </View>
                <View className="flex gap-0.5 flex-row my-4">
                  <Ionicons name="star" color={'orange'} size={16} />
                  <Ionicons name="star" color={'orange'} size={16} />
                  <Ionicons name="star" color={'orange'} size={16} />
                  <Ionicons name="star" color={'orange'} size={16} />
                  <Ionicons name="star-half" color={'orange'} size={16} />
                  <Text className="pl-0.5 text-gray-400" style={{ fontFamily: 'medium' }}>
                    4.5
                  </Text>
                </View>
                <View className="flex gap-4 flex-row">
                  <Button variant={'secondary'} onPress={handleCall}>
                    <Ionicons name="call" size={20} color={'#7761FF'} />
                  </Button>
                  <Button variant={'secondary'}>
                    <Ionicons name="videocam" size={20} color={'#7761FF'} />
                  </Button>
                  <Button variant={'secondary'} onPress={handleMail}>
                    <Ionicons name="mail" size={20} color={'#7761FF'} />
                  </Button>
                </View>
              </View>
            </View>
          </View>

          <View className="bg-white p-2 pb-4 rounded-lg mb-4">
            <Text style={{ fontFamily: 'bold' }} className="text-lg">
              Qualifications
            </Text>
            {/* <Text className="my-1">{item?.services[0]?.description}</Text> */}

            <View>
              <Text style={{ fontFamily: 'medium', fontSize: 12, fontWeight: '400', marginTop: 8 }}>
                {item.qualifications}
              </Text>
            </View>
          </View>
          <View className="bg-white p-2 pb-4 rounded-lg">
            <Text style={{ fontFamily: 'bold' }} className="text-lg">
              My Services
            </Text>
            {/* <Text className="my-1">{item?.services[0]?.description}</Text> */}

            <View className="my-2">
              {item?.services.map((service) => (
                <View key={service.id} className="mb-4">
                  <Text style={{ fontFamily: 'medium', fontSize: 16 }}>{service.name}</Text>
                  <Text style={{ fontFamily: 'regular', fontSize: 12 }}>{service.description}</Text>
                </View>
              ))}
            </View>
          </View>
          <View className="bg-white p-2 pb-4 rounded-lg mt-4">
            <Text style={{ fontFamily: 'bold' }} className="text-lg">
              My Schedules
            </Text>
            {/* <Text className="my-1">{item?.services[0]?.description}</Text> */}

            <View className="my-2">
              {item.availabilitySchedules.length > 0 ? (
                item?.availabilitySchedules.map((service) => (
                  <View key={service.id} className="mb-4">
                    <Text style={{ fontFamily: 'medium', fontSize: 16 }}>{service.dayOfWeek}</Text>
                    <Text style={{ fontFamily: 'regular' }}>
                      {service.startTime} {' - '} {service.endTime}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={{ fontFamily: 'medium' }}>No Schedules</Text>
              )}
            </View>
          </View>
        </ScrollView>
        <View className="bg-white p-4 fixed bottom-0 pb-4">
          <Button
            className="mb-4"
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            Book Appointment
          </Button>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Button
                variant={'ghost'}
                className="w-fit flex justify-end absolute right-0 top-2"
                onPress={() => setModalVisible(false)}>
                <Ionicons name="close" color={Colors.primary} size={22} />
              </Button>
              <View className="w-full py-4">
                <Text>Time:</Text>
                <DateTimePicker
                  style={{}}
                  minimumDate={new Date()}
                  mode="time"
                  display="clock"
                  value={time}
                />
              </View>
              <View className="w-full">
                <Text>Date:</Text>
                <DateTimePicker
                  minimumDate={new Date()}
                  mode="date"
                  display="clock"
                  value={date}
                  onChange={onChange}
                />
              </View>
              <View>
                <Text>Reaason for appointment:</Text>
                <TextInput
                  placeholder="What is your reason"
                  style={styles.input}
                  onChangeText={onChangeText}
                  value={text}
                />
              </View>
              <View className="my-1">
                <Text className="text-sm mb-1">Type</Text>
                <RNPickerSelect
                  onValueChange={(value) => setType(value)}
                  items={[
                    { label: 'Virtual', value: 'virtual' },
                    { label: 'In-Person', value: 'in-person' },
                  ]}
                  placeholder={{
                    label: 'Type',
                    value: null,
                  }}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 15,
                      right: 10,
                    },
                    placeholder: {
                      fontSize: 12,
                      fontWeight: 'bold',
                    },
                  }}
                  Icon={() => {
                    return (
                      <View
                        style={{
                          backgroundColor: 'transparent',
                          borderTopWidth: 10,
                          borderTopColor: 'gray',
                          borderRightWidth: 10,
                          borderRightColor: 'transparent',
                          borderLeftWidth: 10,
                          borderLeftColor: 'transparent',
                          width: 0,
                          height: 0,
                        }}
                      />
                    );
                  }}
                />
              </View>
              <View>
                <Button onPress={onSubmit}>
                  {isLoadingx ? <ActivityIndicator size="small" /> : 'Submit'}
                </Button>
              </View>
            </View>
          </View>
        </BlurView>
      </Modal>
    </>
  );
};

export default DoctorpAppointment;

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    padding: 20,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
    position: 'relative',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginTop: 4,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
