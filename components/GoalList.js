import { useContext, useState } from 'react';
import { GoalContext } from '../contexts/GoalContext';
import { List, ListItem, Layout, Button, Icon } from '@ui-kitten/components';
import GoalSavingsList from './GoalSavingsList';

export default function ({ navigation }) {
	const { goals, removeGoal } = useContext(GoalContext);
	const [visibleDropdown, setVisibleDropdown] = useState(0);

	const handleDelete = (id) => {
		removeGoal(id);
	};

	const renderItemAccessory = (id) => (
		<>
			<Button
				appearance='ghost'
				status='primary'
				accessoryLeft={<Icon name='plus-outline' />}
				onPress={() => navigation.push('SavingForm', { goalId: id })}
			/>
			<Button
				appearance='ghost'
				status='primary'
				accessoryLeft={<Icon name='edit-outline' />}
				onPress={() => navigation.push('GoalForm', { id: id })}
			/>
			<Button
				appearance='ghost'
				status='danger'
				accessoryLeft={<Icon name='trash-2-outline' />}
				onPress={() => handleDelete(id)}
			/>
		</>
	);

	const renderItem = ({ item, index }) => {
		const isVisible = visibleDropdown === item.id;
		const handlePress = () => setVisibleDropdown(isVisible ? 0 : item.id);

		return (
			<>
				<ListItem onPress={handlePress}
					title={`${item.name}: ${item.value}`}
					accessoryRight={() => renderItemAccessory(item.id)}
				/>
				<GoalSavingsList goalId={item.id} savings={item.savings} visible={isVisible} />
			</>
		);
	}

	return (
		<Layout style={{ flex: 1 }}>
			<List
				data={goals}
				renderItem={renderItem}
			/>
			<Button onPress={() => navigation.push('GoalForm')}>Adicionar Meta</Button>
		</Layout>
	);
};