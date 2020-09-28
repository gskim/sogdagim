import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import MyPageScreen from '../screens/MyPageScreen'

const Stack = createStackNavigator()

export const MyPageNavigator = (): React.ReactElement => (
	<Stack.Navigator headerMode='none'>
		<Stack.Screen name='MyPage' component={MyPageScreen}/>
	</Stack.Navigator>
)
