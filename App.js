import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Form from './components/Form.js';
import List from './components/List.js';
import ExpenseProvider from './contexts/ExpenseContext.js';

const Stack = createNativeStackNavigator();
function App() {
	return (
		<ExpenseProvider>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerStyle: {
							backgroundColor: '#f4511e',
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
					}}
				>
					<Stack.Screen
						name="Home"
						component={List}
						options={{ title: 'Minhas despesas' }}
					/>
					<Stack.Screen
						name="Form"
						component={Form}
						options={{ title: 'Incluir despesa' }}
						initialParams={{ expenseId: 0 }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</ExpenseProvider>
	);
}


export default App;
