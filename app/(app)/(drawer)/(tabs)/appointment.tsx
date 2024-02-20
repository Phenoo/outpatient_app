
    import { StyleSheet, Text, View } from 'react-native';


import { Link } from 'expo-router';

export default function TabOneScreen() {
  
        return (
			<View style={styles.container}>
				<Text style={styles.title}>Tab One</Text>
				<View style={styles.separator} />
				<Link href={"/login/"}>
					<Text>Ezddww</Text>
				</Link>
			</View>
		);
    
}


    const styles = StyleSheet.create({
		container: {
			alignItems: 'center',
			flex: 1,
			justifyContent: 'center',
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
		}
	});
