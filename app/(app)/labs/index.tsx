import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useGetDrugs, useGetLabs } from '@/services/queries';
import { FlashList } from '@shopify/flash-list';

const Page = () => {
  const { data, isLoading } = useGetLabs();
  const randomizePrize = () => {
    return Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;
  };

  const prize = randomizePrize();
  if (isLoading) {
    return <ActivityIndicator size={'large'} />;
  }
  return (
    <View className="p-4">
      <ScrollView>
        {data &&
          data.tests.map((item, i) => (
            <View key={i} className="bg-white p-2 my-1 rounded-lg">
              <View className="flex flex-row justify-between mt-1">
                <Text
                  style={{
                    fontFamily: 'medium',
                    fontSize: 16,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'medium',
                    fontSize: 16,
                  }}>
                  ₦{(Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000 * i).toLocaleString()}
                </Text>
              </View>

              <View className="flex flex-row justify-between mt-2">
                <Text
                  style={{
                    fontFamily: 'regular',
                  }}>
                  {item.subCategoryName}
                </Text>
                <Text
                  style={{
                    fontFamily: 'medium',
                  }}>
                  {item.normalRange}
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
