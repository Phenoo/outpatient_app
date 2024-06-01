import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSupabase } from '@/hooks/useSupabase';
import Colors from '@/constants/Colors';

import BoxedIcon from '@/components/BoxedIcon';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { supabase } from '@/config/supabase';
import { Button } from '@/components/ui';

import QRCode from 'react-native-qrcode-svg';
import { useGetProfile } from '@/services/queries';
import { BlurView } from 'expo-blur';

const Page = () => {
  const { user, signOut } = useSupabase();
  const [formData, setFormData] = useState({});
  const [greeting, setGreeting] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { data: profile, error, isLoading } = useGetProfile(user?.id);

  const router = useRouter();

  const devices = [
    {
      name: 'Labs',
      icon: 'megaphone',
      backgroundColor: Colors.green,
    },
  ];

  const items = [
    {
      name: 'Account',
      icon: 'key',
      backgroundColor: Colors.primary,
    },
    {
      name: 'Privacy',
      icon: 'lock-closed',
      backgroundColor: '#33A5D1',
    },
    {
      name: 'Payment and Billings',
      icon: 'card',
      backgroundColor: Colors.brown,
    },
    {
      name: 'Notifications',
      icon: 'notifications',
      backgroundColor: Colors.red,
    },
  ];

  const support = [
    {
      name: 'Help',
      icon: 'information',
      backgroundColor: Colors.primary,
    },
    {
      name: 'Tell a Friend',
      icon: 'heart',
      backgroundColor: Colors.red,
    },
  ];

  const onSignOut = () => {
    signOut();
  };
  return (
    <>
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={defaultStyles.block}>
            <View className="flex justify-center w-full items-center mt-4">
              <Image
                source={require('../../../assets/avatar.png')}
                width={100}
                height={100}
                resizeMode="contain"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100 / 2,
                }}
              />
              <View>
                <Text
                  style={{ fontFamily: 'bold' }}
                  className="text-center font-medium flex items-center text-lg">
                  {profile?.full_name}{' '}
                  <MaterialIcons name="verified" size={14} className="ml-1" color="black" />
                </Text>
                <Text className="text-center text-xs text-green-800">Active</Text>
              </View>
            </View>
            <View className="my-6">
              <Button className="w-fit" onPress={() => setModalVisible(true)}>
                View Card
              </Button>
            </View>
            <FlatList
              data={devices}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
              renderItem={({ item }) => (
                <Pressable style={defaultStyles.item} onPress={() => router.push(`/(app)/labs`)}>
                  <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />

                  <Text style={{ fontFamily: 'regular', fontSize: 14, flex: 1 }}>{item.name}</Text>
                  <Ionicons name="chevron-forward" size={16} color={Colors.gray} />
                </Pressable>
              )}
            />
          </View>

          <View style={defaultStyles.block}>
            <FlatList
              data={items}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
              renderItem={({ item }) => (
                <View style={defaultStyles.item}>
                  <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />

                  <Text style={{ fontFamily: 'regular', fontSize: 14, flex: 1 }}>{item.name}</Text>
                  <Ionicons name="chevron-forward" size={16} color={Colors.gray} />
                </View>
              )}
            />
          </View>

          <View style={defaultStyles.block}>
            <FlatList
              data={support}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
              renderItem={({ item }) => (
                <View style={defaultStyles.item}>
                  <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />

                  <Text style={{ fontFamily: 'regular', fontSize: 14, flex: 1 }}>{item.name}</Text>
                  <Ionicons name="chevron-forward" size={16} color={Colors.gray} />
                </View>
              )}
            />
          </View>

          <TouchableOpacity onPress={onSignOut}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 14,
                textAlign: 'center',
                paddingVertical: 14,
              }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
                <View>
                  <Text
                    style={{ fontFamily: 'medium' }}
                    className="text-center text-xl font-medium mb-2">
                    Hello {profile?.full_name}{' '}
                  </Text>
                </View>
                <QRCode value={user?.id} size={200} color="black" backgroundColor="white" />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.textStyle}>Done</Text>
                </Pressable>
              </View>
            </View>
          </BlurView>
        </Modal>
      </View>
    </>
  );
};

export default Page;
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
    fontSize: 14,
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
  blurContainer: {
    flex: 1,
    padding: 20,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
    position: 'relative',
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
