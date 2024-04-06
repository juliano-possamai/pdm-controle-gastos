import { GoalContext } from '../contexts/GoalContext';
import React, { useContext, useEffect, useState } from 'react';
import { Input, Button, Layout, Text } from '@ui-kitten/components';


//react-native-toast-message
//TODO rever libs que serão usadas para os componentes da interface
//TODO rever tratamentos de inputs controlados, métodos onChange ou refs
/*TODO
	Cadastro de metas: ex, comprar churrasco, carvão
	Cadastro de entradas: Clica na meta, vincula pessoa, valor
	listagem de metas
	detalhes de meta, detalhando quanto cada pessoa contribuiu no total e quanto falta para atingir a meta
*/

export default ({ route, navigation }) => {
	const { saveGoal, findGoal } = useContext(GoalContext);
	const id = route.params.id;

	useEffect(() => {
		if (id > 0) {
			setGoal(findGoal(id));
		}
	}, [id])

	const [goal, setGoal] = useState({
		name: '',
		value: ''
	})

	const handleChange = (name, value) => {
		setGoal({ ...goal, [name]: value });
	}

	const handleSubmit = () => {
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
			<Text category='h6' style={{ marginTop: 16, marginBottom: 8 }}>Valor</Text>
			<Input
				placeholder='Digite o valor'
				value={goal.value}
				onChangeText={val => handleChange('value', val)}
				keyboardType='numeric'
			/>
			<Button style={{ marginTop: 16 }} onPress={handleSubmit}>Salvar</Button>
		</Layout>
	);
};
