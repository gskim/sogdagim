import { MenuContainer } from '@src/containers/menu'
import React from 'react'
import { Alert, View } from 'react-native'
import {
	NavigationParams,
	NavigationScreenProps
} from 'react-navigation'
import { KEY_NAVIGATION_BACK } from './constants'
import {
	getCurrentRouteState,
	NavigationRouteState
} from './util'

export type TopNavigationElement = React.ReactElement<any>
export type BottomNavigationElement = React.ReactElement<any>

export interface TopNavigationParams extends NavigationParams {
	header: (props: NavigationScreenProps) => TopNavigationElement | null
}

export interface BottomNavigationParams extends NavigationParams {
	bottomNavigation: (props: NavigationScreenProps) => BottomNavigationElement | null
}

const MenuTopNavigationParams: TopNavigationParams = {
	header: () => null
	// header: (props: NavigationScreenProps): TopNavigationElement => {
	//   // @ts-ignore (private API)
	//   const { routeName } = getCurrentRouteState(props.navigation)
	//   const index: number = getCurrentRouteIndex(props.navigation)
	//
	//   return (
	//     <TopNavigationBar
	//       {...props}
	//       title={routeName}
	//       backIcon={isRootRoute(index) && ArrowIosBackFill}
	//       onBackPress={() => {
	//         props.navigation.goBack(KEY_NAVIGATION_BACK)
	//       }}
	//     />
	//   )
	// },
}

const EcommerceMenuTopNavigationParams: TopNavigationParams = {
	header: (props: NavigationScreenProps): TopNavigationElement => {
		const state: NavigationRouteState = getCurrentRouteState(props.navigation)

		const onBackPress = () => {
			props.navigation.goBack(KEY_NAVIGATION_BACK)
		}

		const onSearchPress = () => {
			Alert.alert('Search...')
		}

		const onShoppingCartPress = () => {
			props.navigation.navigate({
				key: state.routeName,
				routeName: 'Shopping Cart'
			})
		}

		return (
			<View />
			// <EcommerceHeader
			// 	title={state.routeName}
			// 	onBack={onBackPress}
			// 	onSearch={onSearchPress}
			// 	onShoppingCart={onShoppingCartPress}
			// />
		)
	}
}

const MenuBottomNavigationParams: BottomNavigationParams = {
	bottomNavigation: (props: NavigationScreenProps): BottomNavigationElement => {
		return (
			<MenuContainer {...props} />
		)
	}
}

export const MenuNavigationOptions: NavigationParams = {
	...MenuTopNavigationParams,
	...MenuBottomNavigationParams
}

export const SocialNavigationOptions: NavigationParams = MenuTopNavigationParams

export const ArticlesNavigationOptions: NavigationParams = MenuTopNavigationParams

export const DashboardNavigationOptions: NavigationParams = MenuTopNavigationParams

export const EcommerceNavigationOptions: NavigationParams = EcommerceMenuTopNavigationParams
