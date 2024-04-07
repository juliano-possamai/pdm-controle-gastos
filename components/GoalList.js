import { useContext, useState } from 'react';
import { GoalContext } from '../contexts/GoalContext';
import { List, ListItem, Layout, Button, Icon, Text } from '@ui-kitten/components';
import GoalSavingsList from './GoalSavingsList';

export default function ({ navigation }) {
	const { goals, removeGoal } = useContext(GoalContext);
	const [visibleDropdown, setVisibleDropdown] = useState(0);

	const renderActions = (id) => (
		<>
			<Button
				appearance='ghost'
				status='success'
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
				onPress={() => removeGoal(id)}
			/>
		</>
	);

	const renderChevron = (id, isVisible) => {
		const name = isVisible ? 'chevron-up-outline' : 'chevron-down-outline';

		return (
			<Button
				appearance='ghost'
				status='basic'
				accessoryLeft={<Icon name={name} />}
				onPress={() => setVisibleDropdown(isVisible ? 0 : id)}
			/>
		)
	}

	const renderItem = ({ item, index }) => {
		const isVisible = visibleDropdown === item.id;

		return (
			<>
				<ListItem
					title={`${item.name}: ${item.value}`}
					accessoryLeft={() => renderChevron(item.id, isVisible)}
					accessoryRight={() => renderActions(item.id)}
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