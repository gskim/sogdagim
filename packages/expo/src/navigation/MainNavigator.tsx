import {
	createBottomTabNavigator,
	BottomTabNavigationOptions
  } from '@react-navigation/bottom-tabs'
import { RouteProp } from '@react-navigation/core'
import React from 'react'
import { HomeBottomNavigation } from './BottomNavigator'
import { ChatNavigator } from './ChatNavigator'
import { MyPageNavigator } from './MyPageNavigator'
import { PostNavigator } from './PostNavigator'
const BottomTab = createBottomTabNavigator()

const ROOT_ROUTES: string[] = ['Post', 'Chat', 'MyPage']

const isOneOfRootRoutes = (currentRoute: RouteProp<any, any>): boolean => {
  return ROOT_ROUTES.find((route) => currentRoute.name === route) !== undefined
}

const TabBarVisibleOnRootScreenOptions = ({ route }): BottomTabNavigationOptions => {
  const currentRoute = route.state && route.state.routes[route.state.index]
  return { tabBarVisible: currentRoute && isOneOfRootRoutes(currentRoute) }
}

export const MainNavigator = () => {
	return (
		<BottomTab.Navigator
		screenOptions={TabBarVisibleOnRootScreenOptions}
		// initialRouteName={initialTabRoute}
		tabBar={(props) => <HomeBottomNavigation {...props} />}>
		<BottomTab.Screen name='Post' component={PostNavigator}/>
		<BottomTab.Screen name='Chat' component={ChatNavigator}/>
		<BottomTab.Screen name='MyPage' component={MyPageNavigator}/>
		</BottomTab.Navigator>
	)
}
