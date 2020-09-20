import { createStackNavigator } from '@react-navigation/stack'
import { Icon, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import React from 'react'
import { AsyncStorage } from 'react-native'
import { AuthContext } from './contexts/AuthContext'
import AuthFetcher from './fetchers/AuthFetcher'
import SnsLoginScreen from './screens/SnsLoginScreen'
const MainStack = createStackNavigator()
const AuthStack = createStackNavigator()
const RootStack = createStackNavigator()
const authFetcher = new AuthFetcher()

const BackIcon = (props) => (
	<Icon {...props} name='arrow-back'/>
)
const EditIcon = (props) => (
	<Icon {...props} name='edit'/>
)

  const MenuIcon = (props) => (
	<Icon {...props} name='more-vertical'/>
)

  const InfoIcon = (props) => (
	<Icon {...props} name='info'/>
)

  const LogoutIcon = (props) => (
	<Icon {...props} name='log-out'/>
)

export const AuthStackScreen = () => {

	const [menuVisible, setMenuVisible] = React.useState(false)

	const toggleMenu = () => {
		setMenuVisible(!menuVisible)
	}

	const renderMenuAction = () => (
		<TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
	)
	const renderRightActions = () => (
		<React.Fragment>
		  <TopNavigationAction icon={EditIcon}/>
		  <OverflowMenu
			anchor={renderMenuAction}
			visible={menuVisible}
			onBackdropPress={toggleMenu}>
			<MenuItem accessoryLeft={InfoIcon} title='About'/>
			<MenuItem accessoryLeft={LogoutIcon} title='Logout'/>
		  </OverflowMenu>
		</React.Fragment>
	)

	return (
		<AuthStack.Navigator
		headerMode='screen'
		screenOptions={{
			header: ({ navigation, scene, previous }) => {
				const renderBackAction = () => (
					<TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()}/>
				)
				return <TopNavigation
				alignment='center'
				title={scene.descriptor.options.title}
				accessoryLeft={previous ? renderBackAction : undefined}
				accessoryRight={renderRightActions}
				/>
			}
			}}
		>
			<AuthStack.Screen
				name='Login'
				component={SnsLoginScreen}
				options={{ title: 'Login' }}
			/>
		</AuthStack.Navigator>
	)
}

export const MainStackScreen = () => {

	const [menuVisible, setMenuVisible] = React.useState(false)

	const toggleMenu = () => {
		setMenuVisible(!menuVisible)
	}

	const renderMenuAction = () => (
		<TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
	)
	const renderRightActions = () => (
		<React.Fragment>
		  <TopNavigationAction icon={EditIcon}/>
		  <OverflowMenu
			anchor={renderMenuAction}
			visible={menuVisible}
			onBackdropPress={toggleMenu}>
			<MenuItem accessoryLeft={InfoIcon} title='About'/>
			<MenuItem accessoryLeft={LogoutIcon} title='Logout'/>
		  </OverflowMenu>
		</React.Fragment>
	)
	return (
		<MainStack.Navigator
	  		headerMode='screen'
			screenOptions={{
				header: ({ navigation, scene, previous }) => {
					const renderBackAction = () => (
						<TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()}/>
					)
					return <TopNavigation
					alignment='center'
					title={scene.descriptor.options.title}
					accessoryLeft={previous ? renderBackAction : undefined}
					accessoryRight={renderRightActions}
					/>
				}
			}}
	  	>
		</MainStack.Navigator>
	)
}

export const RootStackNavigator = () => {
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
