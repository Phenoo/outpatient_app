 import { Platform, StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';


export default function ModalScreen() {
    
        return (
			<View style={styles.container}>
				<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
				<Text style={styles.title}>Modal</Text>
				<View style={styles.separator} />
			</View>
		);
    
}


    const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
			flex: 1,
			justifyContent: 'center'
		},
		separator: {
      backgroundColor: '#d1d5db',
			height: 1,
			marginVertical: 30,
			width: '80%'
		},
		title: {
			fontSize: 20,
			fontWeight: 'bold'
		}
	});
