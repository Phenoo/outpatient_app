import {
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Pressable,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

import DatePicker from 'react-native-date-picker';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as z from 'zod';

import { Button, Form, FormField, FormInput } from '@/components/ui';
import { useSupabase } from '@/hooks/useSupabase';

import Colors from '@/constants/Colors';
import Authheader from './auth-header';

import QRCode from 'react-native-qrcode-svg';

import { supabase } from '@/config/supabase';
import { useToast } from 'react-native-toast-notifications';

const formSchema = z.object({
  full_name: z.string(),
  mobile: z.string(),
  gender: z.string(),
  stateOfOrigin: z.string(),
  address: z.string(),
  city: z.string(),
  nationality: z.string(),
});

const GetStarted = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState('false');
  const { user } = useSupabase();
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      mobile: '',
      gender: '',
    },
  });
  const [chosenDate, setChosenDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profile, setProfile] = useState(null);
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectDate) => {
    if (type === 'set') {
      const currentDate = selectDate;
      setDate(currentDate);
      setDateOfBirth(currentDate.toDateString());
    } else {
      togglePicker();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Handle form submission to create/update profile
    // Assuming formData contains the form data
    console.log(values, 'values');
    // Example: Create a new profile entry
    const { data, error } = await supabase
      .from('patients')
      .insert([{ ...values, gender: gender, dob: date, user_id: user?.id }]);

    if (error) {
      console.error('Error creating profile:', error.message);
      toast.show('Hello World');
    } else {
      setProfile(values);
      setModalVisible(true);
      // router.push(`/(app)/(tabs)/`);
    }
  };
  return (
    <View style={{ padding: 10 }}>
      <View className="py-4">
        <View style={styles.center}>
          <Text style={styles.title}>{'Get Started'}</Text>
          <Text style={styles.subtitle}>{'Please introduce yourself'}</Text>
        </View>
      </View>
      <Form {...form}>
        <View className="flex flex-col justify-between h-full space-y-4 pb-32">
          <View className="space-y-4 flex  ">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormInput
                  label="Enter your full Name"
                  placeholder="Name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormInput
                  label="Enter your mobile Number"
                  placeholder="Enter your mobile number"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  secureTextEntry
                  {...field}
                />
              )}
            />
            <View>
              <Text className="text-sm mb-2">Date Of Birth</Text>

              {showPicker && (
                <DateTimePicker mode="date" display="spinner" onChange={onChange} value={date} />
              )}
              {showPicker && (
                <TouchableOpacity
                  onPress={() => setShowPicker(false)}
                  className="bg-gray-400 p-2 rounded-lg w-20 flex justify-center items-center mx-auto">
                  <Text className="text-center ">Cancel</Text>
                </TouchableOpacity>
              )}
              {!showPicker && (
                <TouchableOpacity onPress={togglePicker} className="border rounded-lg">
                  <Text className="p-2 border rounded-lg">{dateOfBirth || 'Sat Aug 15, 2010'}</Text>
                </TouchableOpacity>
              )}
            </View>
            <View className="my-1">
              <Text className="text-sm mb-2">Gender</Text>
              <RNPickerSelect
                onValueChange={(value) => setGender(value)}
                items={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                ]}
                placeholder={{
                  label: 'Select Gender',
                  value: null,
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 20,
                    right: 10,
                  },
                  placeholder: {
                    color: 'purple',
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
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormInput
                  label="Nationality"
                  placeholder="What is your country"
                  autoCapitalize="none"
                  autoCorrect={false}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="stateOfOrigin"
              render={({ field }) => (
                <FormInput
                  label="State Of Origin "
                  placeholder="State Of Origin"
                  autoCapitalize="none"
                  autoCorrect={false}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormInput
                  label="Enter City "
                  placeholder="City"
                  autoCapitalize="none"
                  autoCorrect={false}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormInput
                  label="Enter address of residence "
                  placeholder="Address "
                  autoCapitalize="none"
                  autoCorrect={false}
                  {...field}
                />
              )}
            />
          </View>
          <View>
            <Button
              style={styles.btn}
              size="default"
              variant="default"
              onPress={form.handleSubmit(onSubmit)}>
              {form.formState.isSubmitting ? <ActivityIndicator size="small" /> : 'Submit'}
            </Button>
          </View>
        </View>
      </Form>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text className="text-center font-medium mb-2">Hello User</Text>
              <Text className="text-black mb-2 capitalize">This is your code. Screenshot</Text>
            </View>
            <QRCode value={user?.id} size={200} color="black" backgroundColor="white" />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => router.push(`/(app)/(tabs)/`)}>
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#7761FF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  header: {
    marginVertical: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnback: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: Colors.brown,
    fontSize: 16,
    textAlign: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: Colors.primary,
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
