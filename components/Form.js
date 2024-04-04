import React, { useContext, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { TextField, Picker, NumberInput } from 'react-native-ui-lib';
import { ExpenseContext } from '../contexts/ExpenseContext';

//react-native-toast-message
//TODO rever libs que serão usadas para os componentes da interface
//TODO rever tratamentos de inputs controlados, métodos onChange ou refs
//TODO permitir inserir valores positivos e negativos (seleção de tipo de despesa, entrada ou saída)

const Form = ({navigation}) => {
	const { save, getCategories } = useContext(ExpenseContext);

	const [expense, setExpense] = useState({
		description: '',
		category: '',
		value: '',
	})

	const handleChange = (name, value) => {
		setExpense({ ...expense, [name]: value });
	}

	const handleSubmit = () => {
		//TODO adicionar validação ao salvar
		save(0, expense);
		navigation.navigate('Home');
	}

	return (
		<View>
			<Text>Descrição: </Text>
			<TextField
				value={expense.description}
				onChangeText={(text) => handleChange('description', text)}
				validate={['required', (value) => value.length > 3]}
				validationMessage={['Campo obrigatório', 'A descrição deve possuir mais de 3 caracteres']}
				placeholder="Informe a descrição"
			/>
			<Text>Categoria: </Text>
			<Picker
				value={expense.category}
				placeholder={'Selecione uma categoria'}
				onChange={(cat) => handleChange('category', cat)}
			>
				{getCategories().map((category) => (
					<Picker.Item key={category.value} value={category.value} label={category.label} />
				))}
			</Picker>
			<Text>Valor: </Text>
			<NumberInput
				initialValue={0}
				onChangeNumber={(value) => handleChange('value', value.number)}
				validate={['required', (value) => !parseInt(value) > 0]}
				validationMessage={['Campo obrigatório', 'O preço deve ser maior que zero']}
				fractionDigits={2}
				placeholder={'Informe o preço'}
			/>
			<Button title="Salvar" onPress={handleSubmit} />
		</View>
	);
};

export default Form;
