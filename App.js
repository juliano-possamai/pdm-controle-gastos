import React, { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GoalForm from './components/GoalForm.js';
import SavingForm from './components/SavingForm.js';
import GoalList from './components/GoalList.js';
import GoalProvider from './contexts/GoalContext.js';
import { AuthProvider, useAuth } from './contexts/Auth.js';
import { RootSiblingParent } from 'react-native-root-siblings';
import Login from './components/Login.js';
import Navigation from './components/Navigation.js';

export default () => {
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<RootSiblingParent>
					<AuthProvider>
						<GoalProvider>
							<Navigation />
						</GoalProvider>
					</AuthProvider>
				</RootSiblingParent>
			</ApplicationProvider>
		</>
	);
}