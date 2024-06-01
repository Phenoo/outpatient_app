import { Platform, StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import Authheader from '@/components/auth-header';
import GetStarted from '@/components/GetStarted';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ModalScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: '#FAF9FF',
        flex: 1,
      }}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <GetStarted />
    </View>
  );
}

const styles = StyleSheet.create({
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
