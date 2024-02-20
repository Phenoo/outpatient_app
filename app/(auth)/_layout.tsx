import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="index"
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="sign-up" />
			<Stack.Screen name="sign-in" />
			<Stack.Screen name="verify" />
		</Stack>
	);
}