import { DefaultTheme, InitialState, NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { AsyncStorage } from 'react-native'
import { RootNavigator } from './RootNavigator'

const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
	...DefaultTheme.colors
	// prevent layout blinking when performing navigation
	// background: 'transparent',
 }
}

export const AppNavigator = (): React.ReactElement => {

	React.useEffect(() => {
		const restoreState = async () => {
			const savedState = await AsyncStorage.getItem(NAVIGATION_PERSISTENCE_KEY)
			const state = savedState ? JSON.parse(savedState) : undefined
			if (state !== undefined) {
				setInitialState(state)
			}
		}
		restoreState()
	}, [])

	const [initialState, setInitialState] = React.useState<InitialState | undefined>()

	return (
		<NavigationContainer
		initialState={initialState}
		onStateChange={(state) =>
		AsyncStorage.setItem(NAVIGATION_PERSISTENCE_KEY, JSON.stringify(state))
		}
		theme={navigatorTheme}
		>
			<RootNavigator/>
		</NavigationContainer>
	)

}
