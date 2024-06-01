import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useProvidersByPremise } from '@/services/queries';
import Colors from '@/constants/Colors';
import Carddoctor from '@/components/carddoctor';

const Page = () => {
  const { isError, data, isLoading: loading } = useProvidersByPremise(1294);
  const [selectedTab, setSelectedTab] = useState('All');
  const filteredData = data.filter(
    (item) => selectedTab === 'All' || item.specialization === selectedTab
  );

  return (
    <View className="p-4">
      <ScrollView horizontal className="py-2">
        <TouchableOpacity
          onPress={() => setSelectedTab('All')}
          className="mr-4 capitalize"
          style={[styles.tabButton, selectedTab === 'All' && styles.selectedTabButton]}>
          <Text
            className="capitalize"
            style={[styles.tabButtonText, selectedTab === 'All' && styles.selectedTabButtonText]}>
            {'All'}
          </Text>
        </TouchableOpacity>
        {data && data.length > 0 ? (
          data.map((item, i) => (
            <TouchableOpacity
              onPress={() => setSelectedTab(item?.specialization)}
              key={i}
              className="mr-4 capitalize"
              style={[
                styles.tabButton,
                selectedTab === item?.specialization && styles.selectedTabButton,
              ]}>
              <Text
                className="capitalize"
                style={[
                  styles.tabButtonText,
                  selectedTab === item?.specialization && styles.selectedTabButtonText,
                ]}>
                {item?.specialization}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <ActivityIndicator size={'large'} color={Colors.primary} />
        )}
      </ScrollView>
      <ScrollView>
        <View className="mt-8">
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((item, i) => <Carddoctor key={i} item={item} />)
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
      </ScrollView>
    </View>
  );
};

export default Page;

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
