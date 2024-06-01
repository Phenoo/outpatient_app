import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '~/constants/Colors';
import Authheader from '~/components/auth-header';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as z from 'zod';

import { Button, Form, FormField, FormInput } from '@/components/ui';
import { useSupabase } from '@/hooks/useSupabase';

const formSchem = z.object({
  email: z.string().email('Please ente a valid email address'),
  password: z.string().min(8, 'Please enter ay least 8 characters').max(63, 'Limit'),
});

const LoginPage = () => {
  const router = useRouter();
  const { signInWithPassword } = useSupabase();

  const form = useForm<z.infer<typeof formSchem>>({
    resolver: zodResolver(formSchem),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchem>) {
    try {
      await signInWithPassword(data.email, data.password);
      form.reset();
    } catch (err: Error | any) {
      console.log(err.message);
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <Authheader title="Sign in to komoto" subtitle="Enter your details to sign in." />
      {/* <View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor={Colors.black}
        />

        <TouchableOpacity style={styles.btn} onPress={() => router.push("/(drawer)")}>
          <Text style={{ textAlign: 'center', color: Colors.white, fontSize: 16 }}>Continue</Text>
        </TouchableOpacity>
      </View> */}
      <Form {...form}>
        <View className="gap-4 mx-1 mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormInput
                label="Email"
                placeholder="Email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormInput
                label="Password"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                {...field}
              />
            )}
          />
        </View>
      </Form>
      <Button
        style={styles.btn}
        size="default"
        variant="default"
        onPress={form.handleSubmit(onSubmit)}>
        {form.formState.isSubmitting ? <ActivityIndicator size="small" /> : 'Sign in'}
      </Button>

      <View style={styles.speratorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: '#000',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.separator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: '#000',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 15 }}></View>

      <View style={{ marginTop: 30 }}>
        <Link href={'/(auth)/sign-up'}>
          <Text style={{ textAlign: 'center', fontWeight: '500' }}>
            Don't have an account? Register
          </Text>
        </Link>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(119, 97, 255, 0.2)',
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
  },
  btn: {
    color: '#fff',
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  speratorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    color: Colors.brown,
  },
  continue: {
    padding: 10,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    borderRadius: 15,
  },
});
