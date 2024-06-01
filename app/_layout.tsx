import '../global.css';
import { Stack, SplashScreen, Slot } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SupabaseProvider } from '~/context/SupabaseProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    light: require('../assets/General Sans/Fonts/WEB/fonts/GeneralSans-Light.ttf'),
    regular: require('../assets/General Sans/Fonts/WEB/fonts/GeneralSans-Regular.ttf'),
    medium: require('../assets/General Sans/Fonts/WEB/fonts/GeneralSans-Medium.ttf'),
    bold: require('../assets/General Sans/Fonts/WEB/fonts/GeneralSans-Bold.ttf'),
    // ...FontAwesome.font,
  });

  useEffect(() => {
    // HACK: Hide splash screen after 1 second to hide initial routing animation.
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const client = new QueryClient();

  return (
    <SupabaseProvider>
      {/* <SafeAreaProvider> */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={client}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="(auth)">
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(app)" />
            <Stack.Screen name="modal" />
          </Stack>
          <Toast />
        </QueryClientProvider>
      </GestureHandlerRootView>

      {/* </SafeAreaProvider> */}
    </SupabaseProvider>
  );
}
