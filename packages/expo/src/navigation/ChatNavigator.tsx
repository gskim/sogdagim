import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ChatMainScreen from '../screens/ChatMainScreen'

const Stack = createStackNavigator()

export const ChatNavigator = (): React.ReactElement => (
	<Stack.Navigator headerMode='none'>
		<Stack.Screen name='ChatMain' component={ChatMainScreen}/>
	</Stack.Navigator>
)
