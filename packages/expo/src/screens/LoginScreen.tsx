import React, { useState } from 'react'
import { Button, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { AuthContext } from '../contexts/AuthContext'
import { CommonProps } from '../CommonProps'

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

const LoginScreen = ({ navigation }: CommonProps) => {
	const { signIn } = React.useContext(AuthContext)
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const onLoginButtonPress = async () => {
		await signIn({ email, password })
	}
  return (
	<TextInputAvoidingView>
		<Button onPress={onLoginButtonPress} title='login' >
			로그인
		</Button>

	</TextInputAvoidingView>
  )
}
LoginScreen.title = 'Login'
export default LoginScreen
const styles = StyleSheet.create({
	container: {
	},
	headerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 216
	  },
	  signInLabel: {
		marginTop: 16
	  },
	wrapper: {
		flex: 1
	},
	formContainer: {
		flex: 1,
		paddingTop: 32,
		paddingHorizontal: 16
	},
	forgotPasswordContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	SignUpContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	passwordInput: {
	marginTop: 16
	},
	forgotPasswordButton: {
		paddingHorizontal: 0,
		marginVertical: 12
	},
	signInButton: {
	marginHorizontal: 16
	},
	signUpButton: {
	marginVertical: 12,
	marginHorizontal: 16
	}
})
