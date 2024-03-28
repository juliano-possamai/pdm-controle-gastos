import { useContext, useEffect } from 'react';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { FlatList, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ({ navigation }) {
	const expenseContext = useContext(ExpenseContext);

	const renderItem = ({ item }) => (
		<>
			<Text>{item.description}</Text>
			<Text>{item.category}</Text>
		</>
	);

	return (
		<SafeAreaView>
			<Pressable onPress={() => navigation.push('Form')}>
				<Text>Incluir despesa</Text>
			</Pressable>
			<FlatList
				data={expenseContext.expenses}
				renderItem={renderItem}
				keyExtractor={item => item.id}
			/>
		</SafeAreaView>
	)
}