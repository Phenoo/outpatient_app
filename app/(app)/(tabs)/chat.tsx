import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '@/components/header';

import chats from '@/assets/data/chats.json';
import { defaultStyles } from '@/constants/Styles';
import ChatRow from '@/components/chatRo';
import { Button } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';

const Chatpage = () => {
  const [searchText, setSearchText] = useState('');

  const filteredChats = chats.filter((chat) =>
    chat.from.toLowerCase().includes(searchText.toLowerCase())
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
              Chats
            </Text>
          </View>
          <View></View>
        </View>
        <View className="flex flex-row w-full items-center">
          <TextInput
            style={{ height: 40, margin: 10, padding: 5 }}
            placeholder="Search..."
            className="rounded-lg px-4 flex-1 border-gray-300 border "
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
          <Button variant={'secondary'}>
            <Ionicons name="filter" size={18} />
          </Button>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ paddingBottom: 40, flex: 1, backgroundColor: '#fff' }}>
          <FlatList
            data={filteredChats}
            renderItem={({ item }) => <ChatRow {...item} />}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
            )}
            scrollEnabled={false}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Chatpage;

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
