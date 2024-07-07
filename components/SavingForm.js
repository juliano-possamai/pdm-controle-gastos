import React, { useContext, useState } from 'react';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { GoalContext } from '../contexts/GoalContext';

export default ({ route, navigation }) => {
	const { saveSavings } = useContext(GoalContext);
	const [errors, setErrors] = useState({});
	const goalId = route.params.goalId;

	const [saving, setSaving] = useState({ who: '', value: '' })

	const handleChange = (name, value) => {
		setSaving({ ...saving, [name]: value });
	}

	const validateSubmit = () => {
		if (!saving.who || !saving.value) {
			setErrors({
				who: !saving.who ? 'Campo obrigatório' : '',
				value: !saving.value ? 'Campo obrigatório' : ''
			})

			return false;
		}

		if (isNaN(saving.value) || parseFloat(saving.value) <= 0) {
			setErrors({ value: 'Valor deve ser maior que 0' });
			return false;
		}

		return true;
	}

	const handleSubmit = () => {
		if (!validateSubmit()) {
			return;
		}

		saveSavings(goalId, saving);
		navigation.navigate('Home');
	}

	return (
		<Layout style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
			<Text category='h6' style={{ marginBottom: 8 }}>Quem contribuiu</Text>
			<Input
				autoFocus={true}
				placeholder='Digite o nome'
				value={saving.who}
				onChangeText={val => handleChange('who', val)}
			/>
			{errors.who && <Text category='c1' status='danger'>{errors.who}</Text>}
			<Text category='h6' style={{ marginTop: 16, marginBottom: 8 }}>Valor</Text>
			<Input
				placeholder='Digite o valor'
				value={saving.value}
				onChangeText={val => handleChange('value', val)}
				keyboardType='numeric'
			/>
			{errors.value && <Text category='c1' status='danger'>{errors.value}</Text>}
			<Button style={{ marginTop: 16 }} onPress={handleSubmit}>Enviar</Button>
		</Layout>
	);
};
