import * as eva from '@eva-design/eva'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { DefaultTheme, InitialState, NavigationContainer } from '@react-navigation/native'
import { Assets as StackAssets } from '@react-navigation/stack'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { Linking } from 'expo'
import { Asset } from 'expo-asset'
import * as Device from 'expo-device'
import * as Font from 'expo-font'
import { useKeepAwake } from 'expo-keep-awake'
import * as React from 'react'
import { AsyncStorage, Image, Platform, YellowBox } from 'react-native'
import { AppearanceProvider } from 'react-native-appearance'
import 'react-native-gesture-handler'
import { DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { v4 } from 'react-native-uuid'
import { AppLoading } from './components/AppLoading'
import { SplashImage } from './components/SplashImage'
import theme from './theme.json'
import { RootStackNavigator } from './StackNavigator'

YellowBox.ignoreWarnings(['Require cycle:'])
Asset.loadAsync(StackAssets)
const deviceFetcher = new DeviceFetcher()
import '@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'
import '@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'
import { ExpoDevice } from '@sogdagim/model'
import DeviceFetcher from './fetchers/DeviceFetcher'
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
const DEVICE_UUID = 'DEVICE_UUID'
const cacheImages = (images: any[]) =>
	images.map((image) => {
	if (typeof image === 'string') {
		return Image.prefetch(image)
	} else {
		return Asset.fromModule(image).downloadAsync()
	}
})

const cacheFonts = (fonts: any[]) => fonts.map((font) => Font.loadAsync(font))

const loadAssets = async () => {
	const images = cacheImages([
		require('../assets/splash.png')
	])
	const fonts = cacheFonts([Ionicons.font, FontAwesome.font, MaterialCommunityIcons.font])
	await Promise.all([...images, ...fonts])
	return null
}
const App = () => {
	const [initialState, setInitialState] = React.useState<InitialState | undefined>()
	useKeepAwake()
	React.useEffect(() => {
		const restoreState = async () => {
			const initialUrl = await Linking.getInitialURL()
			if (Platform.OS !== 'web' || initialUrl === null) {
				let uuid = await AsyncStorage.getItem(DEVICE_UUID)
				if (!uuid) {
					uuid = v4()
					await AsyncStorage.setItem(DEVICE_UUID, uuid)
				}
				await deviceFetcher.postDevice(Device as ExpoDevice, uuid)
				const savedState = await AsyncStorage.getItem(NAVIGATION_PERSISTENCE_KEY)
				const state = savedState ? JSON.parse(savedState) : undefined
				if (state !== undefined) {
					setInitialState(state)
				}
			}
		}
		// Fetch the token from storage then navigate to our appropriate place
		restoreState()
	}, [])

	return (
		<React.Fragment>
			<IconRegistry icons={[EvaIconsPack]}/>
			<AppearanceProvider>
		<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
		<PaperProvider theme={paperTheme}>
		<SafeAreaProvider>
			<React.Fragment>
				<NavigationContainer
					initialState={initialState}
					onStateChange={(state) =>
					AsyncStorage.setItem(NAVIGATION_PERSISTENCE_KEY, JSON.stringify(state))
					}
					theme={DefaultTheme}
				>
					<RootStackNavigator />
				</NavigationContainer>
			</React.Fragment>
		</SafeAreaProvider>
		</PaperProvider>
		</ApplicationProvider>
		</AppearanceProvider>
		</React.Fragment>
	)
}

const defaultConfig: { mapping: any, theme: any } = {
	mapping: 'eva',
	theme: 'light'
  }

const Splash = ({ loading }: {loading: boolean}): React.ReactElement => (
	// @ts-ignore
	<SplashImage
	  loading={loading}
	  source={require('../assets/splash.png')}
	/>
)

export default (): React.ReactElement => (
	<AppLoading
	  tasks={[loadAssets]}
	  initialConfig={defaultConfig}
	  placeholder={Splash}
	>
	  {(props) => <App {...props}/>}
	</AppLoading>
  )
