import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { AsyncStorage } from 'react-native'
import { AuthContext } from '../contexts/AuthContext'
import AuthFetcher from '../fetchers/AuthFetcher'
import { AuthNavigator } from './AuthNavigator'
import { MainNavigator } from './MainNavigator'
const RootStack = createStackNavigator()
const authFetcher = new AuthFetcher()

export const RootNavigator = () => {
	const [state, dispatch] = React.useReducer(
	(prevState: any, action: any) => {
		switch (action.type) {
		case 'RESTORE_TOKEN':
			return {
			...prevState,
			userToken: action.token || null
			}
		case 'SIGN_IN':
			return {
			...prevState,
			isSignout: false,
			userToken: action.token
			}
		case 'SIGN_OUT':
			return {
			...prevState,
			isSignout: true,
			userToken: null
			}
		default:
			return {
			...prevState,
			isSignout: true,
			userToken: null
			}
		}
	},
	{
		isSignout: false,
		userToken: null
	}
	)

	const authContext = React.useMemo(
	() => ({
		signIn: async (data: {email: string, password: string}) => {
			const accessToken = await authFetcher.login({ email: data.email, password: data.password })
			await AsyncStorage.setItem('userToken', accessToken)
			dispatch({ type: 'SIGN_IN', token: accessToken })
			// fail
			// alert
		},
		signOut: async () => {
			// fetch logout
			// token reset
			dispatch({ type: 'SIGN_OUT' })
		}
	}),
	[]
	)

	React.useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const bootstrapAsync = async () => {
			let userToken
			try {
				userToken = await AsyncStorage.getItem('userToken')
			} catch (e) {
			// Restoring token failed
			} finally {
				dispatch({ type: 'RESTORE_TOKEN', token: undefined })
			}
			// After restoring token, we may need to validate it in production apps

			// This will switch to the App screen or Auth screen and this loading
			// screen will be unmounted and thrown away.

		}

		bootstrapAsync()
	}, [])
	return (
	<AuthContext.Provider value={authContext}>
		<RootStack.Navigator>
			{state.userToken === null ? (
				<RootStack.Screen
				name='Auth'
				component={AuthNavigator}
				options={{ headerShown: false, animationTypeForReplace: state.isSignout ? 'pop' : 'push' }}
				/>
			) : (
				<RootStack.Screen
				name='Main'
				component={MainNavigator}
				options={{ headerShown: false }}
				/>
			)}
		</RootStack.Navigator>
	</AuthContext.Provider>
	)
}
