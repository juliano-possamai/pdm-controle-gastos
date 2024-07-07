import React, { useState } from 'react';
import { Input, Button, Layout, Text, Icon } from '@ui-kitten/components';
import { useAuth } from '../contexts/Auth';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

export default () => {
	const auth = useAuth();

	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [errors, setErrors] = useState({});
	const [data, setData] = useState({ username: '', password: '' })

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	const renderIcon = () => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<View style={{ width: 20, height: 20 }}>
				<Icon name={secureTextEntry ? 'eye-off' : 'eye'} />
			</View>
		</TouchableWithoutFeedback>
	);

	const handleChange = (name, value) => {
		setData({ ...data, [name]: value });
	}

	const validateSubmit = () => {
		if (!data.username || !data.password) {
			setErrors({
				username: !data.username ? 'Campo obrigatório' : '',
				password: !data.password ? 'Campo obrigatório' : ''
			})

			return false;
		}

		return true;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validateSubmit()) {
			return;
		}

		auth.login(data.username, data.password);
	};

	return (
		<Layout style={styles.container}>
			<View style={styles.iconContainer}>
				<Icon name='person' style={styles.icon} fill='#8F9BB3' />
			</View>
			<Text category='h6' style={styles.label}>Usuário</Text>
			<Input
				autoFocus={true}
				placeholder='Digite o nome do usuário'
				value={data.username}
				onChangeText={val => handleChange('username', val)}
			/>
			{errors.username && <Text category='c1' status='danger'>{errors.username}</Text>}
			<Text category='h6' style={[styles.label, { marginTop: 16 }]}>Senha</Text>
			<Input
				placeholder='Digite sua senha'
				accessoryRight={renderIcon}
				secureTextEntry={secureTextEntry}
				value={data.password}
				name='password'
				onChangeText={val => handleChange('password', val)}
			/>
			{errors.password && <Text category='c1' status='danger'>{errors.password}</Text>}
			<Button style={styles.button} onPress={handleSubmit}>Login</Button>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: { paddingHorizontal: 16, paddingVertical: 10 },
	iconContainer: { alignItems: 'center', marginBottom: 8 },
	icon: { marginTop: 24, width: 64, height: 64 },
	label: { marginBottom: 8 },
	button: { marginTop: 16 },
});
