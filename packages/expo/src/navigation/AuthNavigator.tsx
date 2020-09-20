import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import SnsLoginScreen from '../screens/SnsLoginScreen'
const AuthStack = createStackNavigator()

export const AuthNavigator = () => {

	return (
		<AuthStack.Navigator
		headerMode='none'
		>
			<AuthStack.Screen
				name='Login'
				component={SnsLoginScreen}
			/>
		</AuthStack.Navigator>
	)
}
