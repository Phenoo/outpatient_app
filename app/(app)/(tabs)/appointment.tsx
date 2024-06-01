import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Link } from 'expo-router';
import Header from '@/components/header';
import { useGetAppointment } from '@/services/queries';
import { useSupabase } from '@/hooks/useSupabase';
import Appointcard from '@/components/appoint_card';
import { useState } from 'react';
import Colors from '@/constants/Colors';

export default function TabOneScreen() {
  const { user } = useSupabase();
  const { data: appointments, error, isLoading } = useGetAppointment(user?.id);
  const [selectedTab, setSelectedTab] = useState('Upcoming');

  const upcomingAppointments = appointments?.filter(
    (appointment) =>
      new Date(appointment.appointment_date) > new Date() && appointment.status !== 'Cancelled'
  );

  const filteredAppointments = appointments?.filter(
    (appointment) =>
      new Date(appointment.appointment_date) < new Date() && appointment.status !== 'Cancelled'
  );

  const CancelAppointments = appointments?.filter(
    (appointment) => appointment.status === 'Cancelled'
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        <View className="py-4">
          <View>
            <Text
              style={{
                fontFamily: 'bold',
                fontSize: 30,
              }}>
              Appointment
            </Text>
          </View>
          <View></View>
        </View>
        <View className="flex flex-row justify-center gap-4 mb-4">
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'Upcoming' && styles.selectedTabButton]}
            onPress={() => setSelectedTab('Upcoming')}>
            <Text
              style={[
                styles.tabButtonText,
                selectedTab === 'Upcoming' && styles.selectedTabButtonText,
              ]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'Completed' && styles.selectedTabButton]}
            onPress={() => setSelectedTab('Completed')}>
            <Text
              style={[
                styles.tabButtonText,
                selectedTab === 'Completed' && styles.selectedTabButtonText,
              ]}>
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'Cancelled' && styles.selectedTabButton]}
            onPress={() => setSelectedTab('Cancelled')}>
            <Text
              style={[
                styles.tabButtonText,
                selectedTab === 'Cancelled' && styles.selectedTabButtonText,
              ]}>
              Cancelled
            </Text>
          </TouchableOpacity>
        </View>
        {selectedTab === 'Upcoming' && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {upcomingAppointments && upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((item, i) => <Appointcard key={i} item={item} />)
            ) : isLoading ? (
              <View className="my-8">
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <View>
                <Text style={{ fontFamily: 'medium', fontSize: 16 }}>No Appointment Available</Text>
              </View>
            )}
            {error && (
              <Text style={{ fontFamily: 'medium', fontSize: 16 }}>No Appointment Available</Text>
            )}
          </ScrollView>
        )}

        {selectedTab === 'Completed' && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredAppointments && filteredAppointments.length > 0 ? (
              filteredAppointments.map((item, i) => (
                <Appointcard completed={true} key={i} item={item} />
              ))
            ) : isLoading ? (
              <View className="my-8">
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <View>
                <Text style={{ fontFamily: 'medium', fontSize: 16 }}>No Doctors Available</Text>
              </View>
            )}
            {error && (
              <Text style={{ fontFamily: 'medium', fontSize: 16 }}>No Doctors Available</Text>
            )}
          </ScrollView>
        )}
        {selectedTab === 'Cancelled' && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {CancelAppointments && CancelAppointments.length > 0 ? (
              CancelAppointments.map((item, i) => (
                <Appointcard cancelled={true} key={i} item={item} />
              ))
            ) : isLoading ? (
              <View className="my-8">
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <View>
                <Text style={{ fontFamily: 'medium', fontSize: 16 }}>
                  No Appointments Available
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAF9FF',
  },
  tabButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  selectedTabButton: {
    backgroundColor: Colors.primary,
  },
  tabButtonText: {
    fontWeight: 'bold',
    color: '#808080',
  },
  selectedTabButtonText: {
    color: '#fff',
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
