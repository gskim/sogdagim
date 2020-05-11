import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import axios from 'axios'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { useKeepAwake } from 'expo-keep-awake'
import * as React from 'react'
import { AsyncStorage, Image, YellowBox } from 'react-native'
import 'react-native-gesture-handler'
import {
  DefaultTheme,
  Provider as PaperProvider} from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthContext } from './contexts/AuthContext'
import { AuthStackScreen, MainStackScreen } from './StackNavigator'
const RootStack = createStackNavigator()

YellowBox.ignoreWarnings(['Require cycle:'])

require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf')

const cacheImages = (images: any[]) =>
  images.map((image) => {
	if (typeof image === 'string') {
		return Image.prefetch(image)
	} else {
		return Asset.fromModule(image).downloadAsync()
	}
  })

const cacheFonts = (fonts: any[]) => fonts.map((font) => Font.loadAsync(font))

export default function Index() {
  useKeepAwake()
  const loadAssets = async () => {
	const images = cacheImages([
		require('../assets/splash.png')
	])
	const fonts = cacheFonts([Ionicons.font, FontAwesome.font])
	return await Promise.all([...images, ...fonts])
  }

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
			isLoading: false
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
		isLoading: true,
		isSignout: false,
		userToken: null
	}
  )

  React.useEffect(() => {
	// Fetch the token from storage then navigate to our appropriate place
	const bootstrapAsync = async () => {
		let userToken

		try {
			await loadAssets()
		userToken = await AsyncStorage.getItem('userToken')

		console.log('++++++++')
		console.log(userToken)
			  dispatch({ type: 'RESTORE_TOKEN', token: userToken })
		} catch (e) {
		// Restoring token failed
		} finally {

		}
		// After restoring token, we may need to validate it in production apps

		// This will switch to the App screen or Auth screen and this loading
		// screen will be unmounted and thrown away.

	}

	bootstrapAsync()
  }, [])

  const authContext = React.useMemo(
	() => ({
		signIn: async (data: {email: string, password: string}) => {
			console.log(data)
			const response = await axios.post('http://localhost/auths/login', data)
			console.log(response.status)
			console.log(response.data)
			// fetch login
			// success
			await AsyncStorage.setItem('userToken', response.data.accessToken)
			dispatch({ type: 'SIGN_IN', token: response.data.accessToken })
			// AsyncStorage save

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

	if (!state.isLoading) {
		return (
			<PaperProvider theme={DefaultTheme}>
				<SafeAreaProvider>
					<React.Fragment>
					<NavigationContainer
					>
						<AuthContext.Provider value={authContext}>
							<RootStack.Navigator>
								{state.userToken == null ? (
									<RootStack.Screen name='SignIn' component={AuthStackScreen} options={{ headerShown: false }}/>
								) : (
									<RootStack.Screen name='Home' component={MainStackScreen} options={{ headerShown: false }} />
								)}
							</RootStack.Navigator>
					</AuthContext.Provider>
					</NavigationContainer>
					</React.Fragment>
				</SafeAreaProvider>
			</PaperProvider>
		)
	} else {
		return <AppLoading
		onError={console.error}
		 />
	}
}
