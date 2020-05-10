import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'
import {
  useTheme,
  Appbar,
  Colors,
  FAB,
  TextInput
} from 'react-native-paper'

interface Props {
  navigation: StackNavigationProp<{}>
}

interface AvoidingViewProps {
	children: React.ReactNode
  }

const TextInputAvoidingView = ({ children }: AvoidingViewProps) => {
	return Platform.OS === 'ios' ? (
	  <KeyboardAvoidingView
		style={styles.wrapper}
		behavior='padding'
		keyboardVerticalOffset={80}
	  >
		{children}
	  </KeyboardAvoidingView>
	) : (
	  <>{children}</>
	)
  }

const LoginScreen: React.FC<Props> = ({ navigation }) => {

  navigation.setOptions({
	header: () => (
		<Appbar.Header
		theme={{
			mode: 'exact'
		}}
		>
		<Appbar.Content
			title='Login'
		/>
		</Appbar.Header>
	)
  })

  const {
	colors: { background }
  } = useTheme()

  return (
	<TextInputAvoidingView>
		<ScrollView
		style={[styles.container, { backgroundColor: background }]}
		keyboardShouldPersistTaps={'always'}
		removeClippedSubviews={false}
		>

		<View style={styles.formContainer}>
			<TextInput
				mode='outlined'
				label='Outlined input'
				placeholder='Type something'
			/>
			<TextInput
				mode='outlined'
				label='Outlined input'
				placeholder='Type something'
			/>
		</View>
		</ScrollView>
	</TextInputAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8
	},
	wrapper: {
		flex: 1
	},
	formContainer: {
		flex: 1,
	marginTop: 48
	},
	row: {
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	paddingVertical: 8,
	paddingHorizontal: 16
	},
bottom: {
	position: 'absolute',
	left: 0,
	right: 0,
	bottom: 0
	},
	fab: {
	position: 'absolute',
	right: 16,
	bottom: 28
	}
})
