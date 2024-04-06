import React, { useContext, useState } from 'react';
import { Modal, Layout, Text, Input, Button } from '@ui-kitten/components';
import { GoalContext } from '../contexts/GoalContext';

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
	const { saveSavings } = useContext(GoalContext);
	const goalId = route.params.goalId;

	const [saving, setSaving] = useState({
		who: '',
		value: '',
	})

	const handleChange = (name, value) => {
		setSaving({ ...saving, [name]: value });
	}

	const handleSubmit = () => {
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
			<Text category='h6' style={{ marginTop: 16, marginBottom: 8 }}>Valor</Text>
			<Input
				placeholder='Digite o valor'
				value={saving.value}
				onChangeText={val => handleChange('value', val)}
				keyboardType='numeric'
			/>
			<Button style={{ marginTop: 16 }} onPress={handleSubmit}>Enviar</Button>
		</Layout>
	);
};
