import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'
import {
  useTheme,
  Appbar,
  Button,
  TextInput
} from 'react-native-paper'
import { AuthContext } from '../contexts/AuthContext'

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

const LoginScreen = ({ navigation }: Props) => {

	const { signIn } = React.useContext(AuthContext)

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

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

	const loginBtnClick = async () => {
		await signIn({ email, password })
	}

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
				label='Email'
				value={email}
				placeholder='Type something'
				onChangeText={(text) => setEmail(text)}
			/>
			<TextInput
				mode='outlined'
				label='Password'
				value={password}
				secureTextEntry={true}
				placeholder='Type something'
				onChangeText={(text) => setPassword(text)}
			/>
			<Button icon='camera' mode='contained' onPress={loginBtnClick} style={{ marginTop: 20 }}>
				Press me
  			</Button>
		</View>
		</ScrollView>
	</TextInputAvoidingView>
  )
}

LoginScreen.title = 'Login'

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
	}
})
