import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { useKeepAwake } from 'expo-keep-awake'
import * as React from 'react'
import { YellowBox } from 'react-native'
import 'react-native-gesture-handler'
import { DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
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
				<NavigationContainer theme={DefaultTheme} >
					<RootStackNavigator />
				</NavigationContainer>
			</React.Fragment>
		</SafeAreaProvider>
	</PaperProvider>
)
}
