import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { Appbar } from 'react-native-paper'
import LoginScreen from './screens/Login'

const Stack = createStackNavigator()

export default function Auth() {
  return (
	<Stack.Navigator
		headerMode='screen'
		screenOptions={{
		header: ({ navigation, scene, previous }) => (
			<Appbar.Header>
			{previous ? (
				<Appbar.BackAction onPress={() => navigation.goBack()} />
			) : null}
			<Appbar.Content title={scene.descriptor.options.title} />
			</Appbar.Header>
		)
		}}
	>
		<Stack.Screen
		name='Login'
		component={LoginScreen}
		options={{ title: 'Login' }}
		/>
	</Stack.Navigator>
  )
}
