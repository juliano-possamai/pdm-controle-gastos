import React from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GoalForm from './components/GoalForm.js';
import SavingForm from './components/SavingForm.js';
import GoalList from './components/GoalList.js';
import GoalProvider from './contexts/GoalContext.js';

const Stack = createNativeStackNavigator();

export default () => {
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<GoalProvider>
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
								component={GoalList}
								options={{ title: 'Minhas metas' }}
							/>
							<Stack.Screen
								name="GoalForm"
								component={GoalForm}
								options={{ title: 'Incluir meta' }}
								initialParams={{ id: 0 }}
							/>
							<Stack.Screen
								name="SavingForm"
								component={SavingForm}
								options={{ title: 'Incluir economia' }}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</GoalProvider>
			</ApplicationProvider>
		</>
	);
}