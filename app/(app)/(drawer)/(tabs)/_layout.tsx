import { FontAwesome5, Fontisto, Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '~/constants/Colors';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={styles.tabBarIcon} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.secondary,
        
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon  name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          title: 'Appt.',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
       <Tabs.Screen
        name="prescription"
        options={{
          title: 'Prescribe',
          tabBarIcon: ({ color }) => <Fontisto  name="prescription"   size={24} style={styles.tabBarIcon}  color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="message-text-outline" size={24} color={color} />,
        }}
      />
       <Tabs.Screen
        name="pharm"
        options={{
          title: 'Pharm',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-bag" color={color} />,
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
