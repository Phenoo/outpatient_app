import {
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React from 'react';
import Colors from '~/constants/Colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as z from 'zod';

import { Button, Form, FormField, FormInput } from '@/components/ui';
import { useSupabase } from '@/hooks/useSupabase';

const formSchema = z
  .object({
    email: z.string().email('Please enter a valid email address.'),
    password: z
      .string()
      .min(8, 'Please enter at least 8 characters.')
      .max(64, 'Please enter fewer than 64 characters.')
      .regex(/^(?=.*[a-z])/, 'Your password must have at least one lowercase letter.')
      .regex(/^(?=.*[A-Z])/, 'Your password must have at least one uppercase letter.')
      .regex(/^(?=.*[0-9])/, 'Your password must have at least one number.')
      .regex(/^(?=.*[!@#$%^&*])/, 'Your password must have at least one special character.'),
    confirmPassword: z.string().min(8, 'Please enter at least 8 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Your passwords do not match.',
    path: ['confirmPassword'],
  });

const Registerform = () => {
  const router = useRouter();

  const { signUp } = useSupabase();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    try {
      await signUp(data.email, data.password);
      console.log('user created');
      Alert.alert('Success!', 'Your registration was successful.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      router.push('/(auth)/sign-in');

      form.reset();
    } catch (error: Error | any) {
      console.log(error.message);
    }
  }
  return (
    <View
      style={{
        marginTop: 33,
        gap: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        paddingBottom: 30,
      }}>
      {/* <View style={{  gap: 20 }}>
             <View style={{ position: "relative", gap: 4 }}>
            <Text style={styles.text}>Full name</Text>
            <TextInput style={styles.input} />
            <View style={{ position: "absolute", right: 10, top: 33 }}>
                <FontAwesome name='user' color={Colors.brown} size={20} />
            </View>
            </View>
            <View style={{ position: "relative", gap: 4 }}>
            <Text style={styles.text}>Email Address</Text>
            <TextInput style={styles.input} />
            <View style={{ position: "absolute", right: 10, top: 33 }}>
                <Ionicons name='mail' color={Colors.brown} size={20} />
            </View>
            </View>
            <View style={{ position: "relative", gap: 4 }}>
            <Text style={styles.text}>Date Of birth</Text>
            <TextInput style={styles.input}  />
            <View style={{ position: "absolute", right: 10, top: 33 }}>
                <FontAwesome name='calendar' color={Colors.brown} size={20} />
            </View>
            </View>
            <View style={{ position: "relative", gap: 4 }}>
            <Text style={styles.text}>Phone Number</Text>
            <TextInput style={styles.input} keyboardType='phone-pad' />
            <View style={{ position: "absolute", right: 10, top: 33 }}>
                <FontAwesome name='phone' color={Colors.brown} size={20} />
            </View>
            </View>
            <View style={{ position: "relative", gap: 4 }}>
            <Text style={styles.text}>Gender</Text>
            <TextInput style={styles.input} />
            <View style={{ position: "absolute", right: 10, top: 33 }}>
                <FontAwesome name='genderless' color={Colors.brown} size={20} />
            </View>
            </View>
       </View> */}
      <Form {...form}>
        <View className="space-y-4 flex ">
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormInput
                label="Confirm Password"
                placeholder="Confirm password"
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
        {form.formState.isSubmitting ? <ActivityIndicator size="small" /> : 'Sign up'}
      </Button>
      <View></View>
    </View>
  );
};

export default Registerform;

const styles = StyleSheet.create({
  input: {
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  text: {
    color: Colors.brown,
    fontWeight: '500',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
});
