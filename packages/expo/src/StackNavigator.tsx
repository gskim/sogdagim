import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { AsyncStorage } from 'react-native'
import { Appbar } from 'react-native-paper'
import { AuthContext } from './contexts/AuthContext'
import AuthFetcher from './fetchers/AuthFetcher'
import LoginScreen from './screens/LoginScreen'
import PostList from './screens/PostListScreen'
import ScreenList, { screens } from './screens/ScreenList'
const MainStack = createStackNavigator()
const PostStack = createStackNavigator()
const AuthStack = createStackNavigator()
const RootStack = createStackNavigator()
const authFetcher = new AuthFetcher()

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

export const PostStackNavigator = () => {
	return (
		<PostStack.Navigator
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
			<PostStack.Screen
				name='PostList'
				component={PostList}
				options={{ title: 'PostList' }}
			/>
		</PostStack.Navigator>
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

export const RootStackNavigator = () => {
	  const [state, dispatch] = React.useReducer(
		(prevState: any, action: any) => {
			console.log('========')
			console.log(prevState)
			console.log(action)
			switch (action.type) {
			case 'RESTORE_TOKEN':
				return {
				...prevState,
				userToken: action.token,
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
			},
			signUp: async (data: any) => {
				console.log(data)
				// fetch sign up
				// save token
				dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
				// fail
				// alert
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

				console.log('++++++++')
				console.log(userToken)
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
			{state.userToken == null ? (
				<RootStack.Screen
					name='Auth'
					component={AuthStackScreen}
					options={{ headerShown: false, animationTypeForReplace: state.isSignout ? 'pop' : 'push' }}
				/>
			) : (
				<RootStack.Screen name='Main' component={MainStackScreen} options={{ headerShown: false }} />
			)}
		</RootStack.Navigator>
	</AuthContext.Provider>
	  )
}
