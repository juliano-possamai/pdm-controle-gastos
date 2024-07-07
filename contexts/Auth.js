import Toast from 'react-native-root-toast';
import { useState, createContext, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../api/api.js';

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const userStoreKey = '__user';
	const tokenStoreKey = '__accessToken';

	const login = async () => {
		try {
			const response = await api.get('/login');

			setUser(response.data.user);
			api.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;

			SecureStore.setItem(userStoreKey, JSON.stringify(response.data.user));
			SecureStore.setItem(tokenStoreKey, response.data.accessToken);
		} catch (error) {
			Toast.show('Usuário ou senha inválidos.', { duration: Toast.durations.SHORT });
		}
	}

	const logout = () => {
		setUser(null);
		SecureStore.deleteItemAsync(userStoreKey);
		SecureStore.deleteItemAsync(tokenStoreKey);
	}

	useEffect(() => {
		const storedUser = SecureStore.getItem(userStoreKey);
		const storedToken = SecureStore.getItem(tokenStoreKey);
		if (storedToken && storedUser) {
			setUser(JSON.parse(storedUser));
			api.defaults.headers.Authorization = `Bearer ${storedToken}`;
		}
	}, []);

	return (
		<AuthContext.Provider value={{ signed: Boolean(user), login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);
	return context;
}