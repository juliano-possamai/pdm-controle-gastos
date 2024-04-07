import { GoalContext } from '../contexts/GoalContext';
import React, { useContext, useEffect, useState } from 'react';
import { Input, Button, Layout, Text } from '@ui-kitten/components';

export default ({ route, navigation }) => {
	const { saveGoal, findGoal } = useContext(GoalContext);
	const [goal, setGoal] = useState({ name: '', value: '' })
	const [errors, setErrors] = useState({});
	const id = route.params.id;

	useEffect(() => {
		if (id > 0) {
			setGoal(findGoal(id));
		}
	}, [id])

	const handleChange = (name, value) => {
		setGoal({ ...goal, [name]: value });
	}

	const validateSubmit = () => {
		if (!goal.name || !goal.value) {
			setErrors({
				name: !goal.name ? 'Campo obrigatório' : '',
				value: !goal.value ? 'Campo obrigatório' : ''
			})

			return false;
		}

		return true;
	}

	const handleSubmit = () => {
		if (!validateSubmit()) {
			return;
		}

		saveGoal(id, goal);
		navigation.navigate('Home');
	}

	return (
		<Layout style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
			<Text category='h6' style={{ marginBottom: 8 }}>Nome</Text>
			<Input
				autoFocus={true}
				placeholder='Digite o nome'
				value={goal.name}
				onChangeText={val => handleChange('name', val)}
			/>
			{errors.name && <Text category='c1' status='danger'>{errors.name}</Text>}
			<Text category='h6' style={{ marginTop: 16, marginBottom: 8 }}>Valor</Text>
			<Input
				placeholder='Digite o valor'
				value={goal.value}
				onChangeText={val => handleChange('value', val)}
				keyboardType='numeric'
			/>
			{errors.value && <Text category='c1' status='danger'>{errors.value}</Text>}
			<Button style={{ marginTop: 16 }} onPress={handleSubmit}>Salvar</Button>
		</Layout>
	);
};
