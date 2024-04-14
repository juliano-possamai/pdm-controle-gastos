import { useContext, useState } from 'react';
import { GoalContext } from '../contexts/GoalContext';
import { List, ListItem, Layout, Button, Icon, Text } from '@ui-kitten/components';
import GoalSavingsList from './GoalSavingsList';

export default ({ navigation }) => {
	const { goals, isGoalAchieved, removeGoal } = useContext(GoalContext);
	const [visibleDropdown, setVisibleDropdown] = useState(0);

	const renderActions = (id) => (
		<>
			<Button
				appearance='ghost'
				size='small'
				status='success'
				accessoryLeft={<Icon name='plus-outline' />}
				onPress={() => navigation.push('SavingForm', { goalId: id })}
			/>
			<Button
				appearance='ghost'
				size='small'
				status='primary'
				accessoryLeft={<Icon name='edit-outline' />}
				onPress={() => navigation.push('GoalForm', { id: id })}
			/>
			<Button
				appearance='ghost'
				size='small'
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
					style={{ backgroundColor: isGoalAchieved(item.id) ? '#C7FFC8' : 'transparent'}}
					title={`${item.name}: R$${item.value}`}
					accessoryLeft={() => renderChevron(item.id, isVisible)}
					accessoryRight={() => renderActions(item.id)}
				/>
				<GoalSavingsList goalId={item.id} savings={item.savings} visible={isVisible} />
			</>
		);
	}

	return (
		<Layout style={{ flex: 1 }}>
			{goals.length === 0 &&
				<Text style={{ textAlign: 'center', marginTop: 16 }}>Nenhuma meta cadastrada</Text>
			}
			<List
				data={goals}
				renderItem={renderItem}
			/>
			<Button
				style={{ margin: 16, borderRadius: 0 }}
				onPress={() => navigation.push('GoalForm')}
			>
				Adicionar Meta
			</Button>
		</Layout>
	);
};