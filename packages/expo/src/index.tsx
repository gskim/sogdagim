import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { useKeepAwake } from 'expo-keep-awake'
import * as React from 'react'
import { Text, YellowBox } from 'react-native'
import 'react-native-gesture-handler'
import { DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { screens } from './screens/ScreenList'
import LinkingPrefixes from './LinkingPrefixes'
import { RootStackNavigator } from './StackNavigator'
YellowBox.ignoreWarnings(['Require cycle:'])

require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf')

const paperTheme = {
	...PaperDefaultTheme,
	colors: {
		...PaperDefaultTheme.colors,
		...DefaultTheme.colors,
		surface: DefaultTheme.colors.card,
		accent: 'rgb(255, 45, 85)'
	}
}

export default function Index() {
  useKeepAwake()
  return (
	<PaperProvider theme={paperTheme}>
		<SafeAreaProvider>
			<React.Fragment>
				<NavigationContainer
					theme={DefaultTheme}
					// linking={{
					// 	// To test deep linking on, run the following in the Terminal:
					// 	// Android: adb shell am start -a android.intent.action.VIEW -d "exp://127.0.0.1:19000/--/simple-stack"
					// 	// iOS: xcrun simctl openurl booted exp://127.0.0.1:19000/--/simple-stack
					// 	// Android (bare): adb shell am start -a android.intent.action.VIEW -d "rne://127.0.0.1:19000/--/simple-stack"
					// 	// iOS (bare): xcrun simctl openurl booted rne://127.0.0.1:19000/--/simple-stack
					// 	// The first segment of the link is the the scheme + host (returned by `Linking.makeUrl`)
					// 	prefixes: LinkingPrefixes,
					// 	config: {
					// 	  Root: {
					// 		path: '',
					// 		initialRouteName: 'Home',
					// 		screens: Object.keys(screens).reduce<{ [key: string]: string }>(
					// 		  (acc, name) => {
					// 			// Convert screen names such as SimpleStack to kebab case (simple-stack)
					// 			acc[name] = name
					// 			  .replace(/([A-Z]+)/g, '-$1')
					// 			  .replace(/^-/, '')
					// 			  .toLowerCase()

					// 			return acc
					// 		  },
					// 		  { Home: '' }
					// 		)
					// 	  }
					// 	}
					//   }}
					//   fallback={<Text>Loading…</Text>}
				>
					<RootStackNavigator />
				</NavigationContainer>
			</React.Fragment>
		</SafeAreaProvider>
	</PaperProvider>
)
}
