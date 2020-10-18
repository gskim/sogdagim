import * as eva from '@eva-design/eva'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Assets as StackAssets } from '@react-navigation/stack'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { Linking } from 'expo'
import { Asset } from 'expo-asset'
import * as Device from 'expo-device'
import * as Font from 'expo-font'
import { useKeepAwake } from 'expo-keep-awake'
import * as React from 'react'
import { AsyncStorage, Image, Platform, StatusBar, YellowBox } from 'react-native'
import { AppearanceProvider } from 'react-native-appearance'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { v4 } from 'react-native-uuid'
import { AppLoading } from './components/AppLoading'
import { SplashImage } from './components/SplashImage'
import { default as mapping } from './mapping.json'
import { AppNavigator } from './navigation/AppNavigator'
import { default as theme } from './theme.json'

YellowBox.ignoreWarnings(['Require cycle:', 'Expected style'])
Asset.loadAsync(StackAssets)
const deviceFetcher = new DeviceFetcher()
import '@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'
import '@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'
import { ExpoDevice } from '@sogdagim/model'
import DeviceFetcher from './fetchers/DeviceFetcher'

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

const restoreState = async () => {
	const initialUrl = await Linking.getInitialURL()
	if (Platform.OS !== 'web' || initialUrl === null) {
		let uuid = await AsyncStorage.getItem(DEVICE_UUID)
		if (!uuid) {
			uuid = v4()
			await AsyncStorage.setItem(DEVICE_UUID, uuid)
		}
		await deviceFetcher.postDevice(Device as ExpoDevice, uuid)

	}
}

const App = () => {
	useKeepAwake()
	return (
		<React.Fragment>
			<IconRegistry icons={[EvaIconsPack]}/>
			<AppearanceProvider>
				<ApplicationProvider
				{...eva}
				theme={{ ...eva.light, ...theme }}
				customMapping={mapping}
				>
					<SafeAreaProvider>
						<StatusBar />
						<AppNavigator />
					</SafeAreaProvider>
				</ApplicationProvider>
			</AppearanceProvider>
		</React.Fragment>
	)
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
	tasks={[loadAssets, restoreState]}
	placeholder={Splash}
	>
	{(props) => <App {...props}/>}
	</AppLoading>
  )
