import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { DefaultTheme, InitialState, NavigationContainer } from '@react-navigation/native'
import { Assets as StackAssets } from '@react-navigation/stack'
import { Linking } from 'expo'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { useKeepAwake } from 'expo-keep-awake'
import * as React from 'react'
import { AsyncStorage, Image, Platform, YellowBox } from 'react-native'
import 'react-native-gesture-handler'
import { DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RootStackNavigator } from './StackNavigator'

YellowBox.ignoreWarnings(['Require cycle:'])
Asset.loadAsync(StackAssets)
import '@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'
import '@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'
const paperTheme = {
	...PaperDefaultTheme,
	colors: {
		...DefaultTheme.colors,
		...PaperDefaultTheme.colors,
		primary: '#07668C',
		// text: '#F2F2F0',
		surface: DefaultTheme.colors.card,
		accent: '#F2B705'
	}
}
const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'
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
	const [isReady, setIsReady] = React.useState(false)
	const [initialState, setInitialState] = React.useState<
	InitialState | undefined
  >()
	useKeepAwake()
	const loadAssets = async () => {
		const images = cacheImages([
			require('../assets/splash.png')
		])
		const fonts = cacheFonts([Ionicons.font, FontAwesome.font, MaterialCommunityIcons.font])
		await Promise.all([...images, ...fonts])
	}
	React.useEffect(() => {
		const restoreState = async () => {
			const initialUrl = await Linking.getInitialURL()
			  console.log(initialUrl)

			  if (Platform.OS !== 'web' || initialUrl === null) {
				const savedState = await AsyncStorage.getItem(
				  NAVIGATION_PERSISTENCE_KEY
				)

				const state = savedState ? JSON.parse(savedState) : undefined

				if (state !== undefined) {
				  setInitialState(state)
				}
			}
		  }
		// Fetch the token from storage then navigate to our appropriate place
		restoreState()
	}, [])
	const onFinish = () => setIsReady(true)
	if (!isReady) { return <AppLoading startAsync={loadAssets} onFinish={onFinish} onError={console.error}/>
	}
	return (
	<PaperProvider theme={paperTheme}>
		<SafeAreaProvider>
			<React.Fragment>
				<NavigationContainer
					initialState={initialState}
					onStateChange={(state) =>
					AsyncStorage.setItem(
						NAVIGATION_PERSISTENCE_KEY,
						JSON.stringify(state)
					)
					}
					theme={DefaultTheme}
				>
					<RootStackNavigator />
				</NavigationContainer>
			</React.Fragment>
		</SafeAreaProvider>
	</PaperProvider>
	)
}
