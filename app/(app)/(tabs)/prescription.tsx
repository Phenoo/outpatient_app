import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '@/components/header';
import { Ionicons } from '@expo/vector-icons';
import { useGetAppointment, useGetDrugs } from '@/services/queries';
import IdTitle from '@/components/IDTitle';
import { useSupabase } from '@/hooks/useSupabase';
import { format } from 'date-fns';
import Colors from '@/constants/Colors';

const Prescriptionpage = () => {
  const { user } = useSupabase();

  const { data: appointments, error, isLoading } = useGetAppointment(user?.id);
  const filteredAppointments =
    appointments &&
    appointments?.filter(
      (appointment) =>
        new Date(appointment.appointment_date) < new Date() && appointment.status !== 'Cancelled'
    );

  const { data: drugs } = useGetDrugs();

  if (!appointments || isLoading) {
    return <ActivityIndicator size={'large'} color={Colors.primary} />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        <View className="py-1 px-4 mb-1">
          <View>
            <Text
              style={{
                fontFamily: 'bold',
                fontSize: 30,
              }}>
              Prescription
            </Text>
          </View>
          <View></View>
        </View>
        <ScrollView className="p-2">
          <View></View>
          <View className="my-6 bg-white p-4 rounded-lg flex flex-row gap-1">
            <Text>
              <Ionicons name="information-circle" size={24} color={'#808080'} />
            </Text>
            <Text
              style={{
                fontFamily: 'medium',
              }}
              className="italic">
              {'  '}
              Prescription Guide
            </Text>
          </View>
          <View></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Prescriptionpage;

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
