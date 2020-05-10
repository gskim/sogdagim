import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { InitialState, NavigationContainer } from '@react-navigation/native'
import axios from 'axios'
import { AppLoading, Updates } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { useKeepAwake } from 'expo-keep-awake'
import * as React from 'react'
import { AsyncStorage, I18nManager, Image, Platform, YellowBox } from 'react-native'
import {
  DarkTheme,
  DefaultTheme,
  Provider as PaperProvider,
  Theme
} from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Auth from './AuthNavigator'
import App from './RootNavigator'

YellowBox.ignoreWarnings(['Require cycle:'])

const PERSISTENCE_KEY = 'NAVIGATION_STATE'
const PREFERENCES_KEY = 'APP_PREFERENCES'

const PreferencesContext = React.createContext<any>(null)

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

  const [isReady, setIsReady] = React.useState(false)
  const [initialState, setInitialState] = React.useState<
	InitialState | undefined
  >()
  const [theme, setTheme] = React.useState<Theme>(DefaultTheme)
  const [rtl, setRtl] = React.useState<boolean>(I18nManager.isRTL)
  const [isLogin, setIsLogin] = React.useState(false)

  const loadAssets = async () => {
	  console.log('loadAssets')
	const images = cacheImages([
		require('../assets/splash.png')
	])
	const fonts = cacheFonts([Ionicons.font, FontAwesome.font])
	return await Promise.all([...images, ...fonts])
  }

  React.useEffect(() => {
	  const checkLogin = async () => {
		  const token = await AsyncStorage.getItem('token')
		  if (token) {
			// token 으로 login check
		  } else {
			  // 로그인 페이지 이동
		  }
	  }
  })

  React.useEffect(() => {
	const restoreState = async () => {
		try {
		const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY)
		const state = JSON.parse(savedStateString || '')
		console.log('============')
		console.log(state)

		setInitialState(state)
		} catch (e) {
		// ignore error
		} finally {
			console.log('finalliy', isReady)
		setIsReady(true)
		}
	}
	const cacheWork = async () => {
		await loadAssets()
	}
	if (!isReady) {
		cacheWork()
		restoreState()
	}
  }, [isReady])

  React.useEffect(() => {
	const restorePrefs = async () => {
		try {
		const prefString = await AsyncStorage.getItem(PREFERENCES_KEY)
		const preferences = JSON.parse(prefString || '')
			console.log('+++++++')
			console.log(preferences)
		if (preferences) {
			// eslint-disable-next-line react/no-did-mount-set-state
			setTheme(preferences.theme === 'dark' ? DarkTheme : DefaultTheme)

			if (typeof preferences.rtl === 'boolean') {
			setRtl(preferences.rtl)
			}
		}
		} catch (e) {
		// ignore error
		}
	}
	restorePrefs()
  }, [])

  React.useEffect(() => {
	const savePrefs = async () => {
		try {
		await AsyncStorage.setItem(
			PREFERENCES_KEY,
			JSON.stringify({
			theme: theme === DarkTheme ? 'dark' : 'light',
			rtl
			})
		)
		} catch (e) {
		// ignore error
		}

		if (I18nManager.isRTL !== rtl) {
		I18nManager.forceRTL(rtl)
		Updates.reloadFromCache()
		}
	}
	savePrefs()
  }, [rtl, theme])

  const preferences = React.useMemo(
	() => ({
		rtl,
		theme
	}),
	[rtl, theme]
  )
	if (isReady) {
		return (
			<PaperProvider theme={theme}>
				<SafeAreaProvider>
				<PreferencesContext.Provider value={preferences}>
					<React.Fragment>
					<NavigationContainer
						initialState={initialState}
						onStateChange={(state) =>
						AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
						}
					>
						{/* <Auth /> */}
						{isLogin ? <App /> : <Auth />}
						{/* {Platform.OS === 'web' ? (
						<App />
						) : (
						<App />
						)} */}
					</NavigationContainer>
					</React.Fragment>
				</PreferencesContext.Provider>
				</SafeAreaProvider>
			</PaperProvider>
		)
	} else {
		return <AppLoading
		onError={console.error}
		 />
	}
}
