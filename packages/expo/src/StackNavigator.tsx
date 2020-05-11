import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Appbar } from 'react-native-paper'

import LoginScreen from './screens/Login'
import ScreenList, { screens } from './ScreenList'

  const MainStack = createStackNavigator()
  const AuthStack = createStackNavigator()

  export const AuthStackScreen = () => {
	  return (
		<AuthStack.Navigator
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
		<AuthStack.Screen
		name='Login'
		component={LoginScreen}
		options={{ title: 'Login' }}
		/>
	</AuthStack.Navigator>
	  )
  }

  export const MainStackScreen = () => {
	return (
	  <MainStack.Navigator
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
		<MainStack.Screen
		name='Home'
		component={ScreenList}
		options={{ title: 'Screens' }}
		/>
		{(Object.keys(screens)).map((id) => (
		<MainStack.Screen
			key={id}
			name={id}
			component={screens[id]}
			options={{ title: screens[id].title }}
		/>
		))}
	  </MainStack.Navigator>
	)
  }
