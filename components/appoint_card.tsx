import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useProvidersByPremise } from '@/services/queries';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';

import { format } from 'date-fns';
import { Button } from './ui';
import Colors from '@/constants/Colors';
import Toast from 'react-native-toast-message';
import { supabase } from '@/config/supabase';
import { useSupabase } from '@/hooks/useSupabase';
import { BlurView } from 'expo-blur';

import DateTimePicker from '@react-native-community/datetimepicker';

const Appointcard = ({ item, completed, cancelled }: any) => {
  const { isError, data, isLoading: loading } = useProvidersByPremise(1294);
  const searchById = (id: number) => {
    return data && data.find((item: any) => item.id === id);
  };
  const { user } = useSupabase();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleBook, setModalVisibleBook] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const parsedTime = new Date(`2022-01-01T${item.appointment_time}`);

  // Example usage
  const info = searchById(Number(item.doctor));
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

    setLoading(true); // Set loading to true when starting form submission

    const { data, error } = await supabase
      .from('appointment')
      .update({
        status: 'Cancelled',
      })
      .match({
        id: item.id,
        user_id: user?.id,
      });
    setLoading(false); // Set loading to false after form submission

    if (error) {
      console.error('Error cancelling appointment:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Hello',
        text2: error.message,
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Hello',
        text2: 'Appointment cancelled 👋',
      });
      console.log('cancle');

      // router.push(`/(app)/(tabs)/`);
    }
  };

  const onSubmitEdit = async () => {
    // Handle form submission to create/update profile
    // Assuming formData contains the form data
    // Example: Create a new profile entry

    setLoading(true); // Set loading to true when starting form submission

    const { data, error } = await supabase
      .from('appointment')
      .update({
        appointment_time: time.toTimeString(),
        appointment_date: date,
      })
      .match({
        id: item.id,
        user_id: user?.id,
      });
    setLoading(false); // Set loading to false after form submission

    if (error) {
      console.error('Error rescheduling appointment:', error.message);
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
        text2: 'Appointment Rescheduled 👋',
      });
    }
  };

  const onChange = ({ type }, selectDate) => {
    if (type === 'set') {
      const currentDate = selectDate;
      setDate(currentDate);
    } else {
    }
  };

  if (!item || !info) {
    return <ActivityIndicator size={'small'} />;
  }
  return (
    <>
      <View className="my-1 bg-white p-2 rounded-xl mb-2">
        <View className="flex gap-2 flex-row mb-2">
          <View>
            <Image
              source={{
                uri: imagesPicture[item?.doctor],
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
            <View className="flex flex-row justify-between ">
              <View>
                <Text style={{ fontFamily: 'bold', fontSize: 16 }}>{info.name}</Text>
                <Text className="capitalize text-gray-500 mt-0.5" style={{ fontFamily: 'medium' }}>
                  {info.specialization}
                </Text>
              </View>
              <View>
                <TouchableOpacity className="bg-[#dfdaff] p-3 rounded-full">
                  {item.type === 'in-person' ? (
                    <Ionicons name="person" size={20} color={Colors.primary} />
                  ) : (
                    <Ionicons name="videocam-sharp" size={20} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View className="mt-2">
                {completed && (
                  <View className="ml-auto px-2 py-1 rounded-lg bg-gray-100 ">
                    <Text
                      className="text-green-600"
                      style={{
                        fontFamily: 'medium',
                      }}>
                      Completed
                    </Text>
                  </View>
                )}
                {cancelled && (
                  <View className="ml-auto px-2 py-1 rounded-lg bg-gray-100 ">
                    <Text
                      className="text-red-600"
                      style={{
                        fontFamily: 'medium',
                      }}>
                      Cancelled
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        <View className="my-3 flex flex-row justify-between rounded-lg ">
          <View>
            <Text className="text-gray-500" style={{ fontFamily: 'medium' }}>
              <Feather name="clock" size={18} color="gray" />
              {'  '}

              {format(new Date(parsedTime), 'hh:mm a')}
            </Text>
          </View>
          <View>
            <Text className="text-gray-500" style={{ fontFamily: 'medium' }}>
              <FontAwesome6 name="calendar-alt" size={20} color="gray" />
              {'  '}
              {format(new Date(item.appointment_date), 'eeee, MMMM d')}
            </Text>
          </View>
        </View>
        {completed ? (
          <View className="flex flex-row gap-2 justify-between items-center mx-auto">
            <TouchableOpacity
              onPress={() => {
                setModalVisibleBook(!modalVisibleBook);
              }}
              style={{
                borderWidth: 2,
                borderColor: Colors.primary,
                padding: 15,
                borderRadius: 30,
                flex: 1,
              }}>
              <Text
                style={{
                  color: Colors.primary,
                  fontFamily: 'bold',
                  textAlign: 'center',
                }}>
                Book Again
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary,
                padding: 15,
                borderRadius: 30,
                flex: 1,
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: 'bold',
                  textAlign: 'center',
                }}>
                Enter Review
              </Text>
            </TouchableOpacity>
          </View>
        ) : cancelled ? (
          <View></View>
        ) : (
          <View className="flex flex-row gap-2 justify-between items-center mx-auto">
            <TouchableOpacity
              onPress={onSubmit}
              style={{
                borderWidth: 2,
                borderColor: Colors.primary,
                padding: 15,
                borderRadius: 30,
                flex: 1,
              }}>
              <Text
                style={{
                  color: Colors.primary,
                  fontFamily: 'bold',
                  textAlign: 'center',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{
                backgroundColor: Colors.primary,
                padding: 15,
                borderRadius: 30,
                flex: 1,
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: 'medium',
                  textAlign: 'center',
                }}>
                Reschedule
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
              <Text style={{ fontFamily: 'medium', fontSize: 18 }}>Reschedule</Text>

              <View className="w-full py-4">
                <Text style={{ fontFamily: 'regular' }}>Time:</Text>
                <DateTimePicker
                  style={{}}
                  minimumDate={new Date()}
                  mode="time"
                  display="clock"
                  value={time}
                />
              </View>
              <View className="w-full">
                <Text style={{ fontFamily: 'regular' }}>Date:</Text>
                <DateTimePicker
                  minimumDate={new Date()}
                  mode="date"
                  display="clock"
                  value={date}
                  onChange={onChange}
                />
              </View>

              <View>
                <Button onPress={onSubmitEdit}>
                  {isLoading ? <ActivityIndicator size="small" /> : 'Submit'}
                </Button>
              </View>
            </View>
          </View>
        </BlurView>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleBook}
        onRequestClose={() => {
          setModalVisible(!modalVisibleBook);
        }}>
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Button
                variant={'ghost'}
                className="w-fit flex justify-end absolute right-0 top-2"
                onPress={() => setModalVisibleBook(false)}>
                <Ionicons name="close" color={Colors.primary} size={22} />
              </Button>
              <Text style={{ fontFamily: 'medium', fontSize: 18 }}>Book Again</Text>
              <View className="w-full py-4">
                <Text style={{ fontFamily: 'regular' }}>Time:</Text>
                <DateTimePicker
                  style={{}}
                  minimumDate={new Date()}
                  mode="time"
                  display="clock"
                  value={time}
                />
              </View>
              <View className="w-full">
                <Text style={{ fontFamily: 'regular' }}>Date:</Text>
                <DateTimePicker
                  minimumDate={new Date()}
                  mode="date"
                  display="clock"
                  value={date}
                  onChange={onChange}
                />
              </View>

              <View>
                <Button onPress={onSubmitEdit}>
                  {isLoading ? <ActivityIndicator size="small" /> : 'Submit'}
                </Button>
              </View>
            </View>
          </View>
        </BlurView>
      </Modal>
    </>
  );
};

export default Appointcard;

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
