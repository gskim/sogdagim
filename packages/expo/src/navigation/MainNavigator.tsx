import {
	createBottomTabNavigator,
	BottomTabNavigationOptions
  } from '@react-navigation/bottom-tabs'
import { RouteProp } from '@react-navigation/core'
import React from 'react'
import { HomeBottomNavigation } from './BottomNavigator'
const BottomTab = createBottomTabNavigator()

const ROOT_ROUTES: string[] = ['Home', 'Layouts', 'Components', 'Themes']

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
		{/* <BottomTab.Screen name='Post' component={}/>
		<BottomTab.Screen name='Chat' component={ComponentsNavigator}/>
		<BottomTab.Screen name='MyPage' component={ThemesNavigator}/> */}
		</BottomTab.Navigator>
	)
}
