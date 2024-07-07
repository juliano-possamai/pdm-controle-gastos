import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/Auth";
import Login from "./Login";
import GoalForm from "./GoalForm";
import GoalList from "./GoalList";
import SavingForm from "./SavingForm";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

export default () => {
	const auth = useAuth();

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: { backgroundColor: '#2c3e50' },
					headerTintColor: '#fff',
					headerTitleStyle: { color: '#ffffff', fontSize: 20 }
				}}
			>
				{!auth.signed
					? <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
					: <>
						<Stack.Screen name="Home" component={GoalList} options={{
							title: 'Minhas metas',
							headerRight: () => (
								<TouchableOpacity onPress={auth.logout} style={{ marginRight: 10 }}>
									<Text style={{ color: '#fff' }}>Logout</Text>
								</TouchableOpacity>
							),
						}} />
						<Stack.Screen name="GoalForm" component={GoalForm}
							options={({ route }) => ({ title: !route.params.id ? 'Incluir meta' : 'Editar meta' })} initialParams={{ id: 0 }}
						/>
						<Stack.Screen name="SavingForm" component={SavingForm} options={{ title: 'Incluir economia' }} />
					</>
				}
			</Stack.Navigator>
		</NavigationContainer>
	);
}