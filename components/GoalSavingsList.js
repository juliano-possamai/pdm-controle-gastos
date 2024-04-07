import { useContext } from 'react';
import { GoalContext } from '../contexts/GoalContext';
import { Button, Divider, Icon, List, ListItem, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

export default ({ goalId, savings, visible }) => {
	const { removeSaving } = useContext(GoalContext);

	const renderItemAccessory = (id) => (
		<Button
			appearance='ghost'
			status='danger'
			accessoryLeft={<Icon name='trash-2-outline' />}
			onPress={() => removeSaving(goalId, id)}
		/>
	);

	return (
		<>
			{visible && (
				<>
					<Divider />
					{!savings.length ?
						<View style={styles.container}>
							<Text style={styles.text}>
								Nenhuma economia cadastrada
							</Text>
						</View>
						:
						<List
							data={savings}
							renderItem={({ item }) => (
								<ListItem
									key={item.id}
									title={`${item.who} contribuiu com R$ ${item.value}`}
									accessoryRight={() => renderItemAccessory(item.id)}
								/>
							)}
						/>
					}
				</>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 4,
		marginBottom: 4
	},
	text: { textAlign: 'center' }
});