import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import PostListScreen from '../screens/PostListScreen'

const Stack = createStackNavigator()

export const PostNavigator = (): React.ReactElement => (
	<Stack.Navigator headerMode='none'>
		<Stack.Screen name='PostList' component={PostListScreen}/>
	</Stack.Navigator>
)
