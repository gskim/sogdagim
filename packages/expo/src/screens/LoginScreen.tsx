import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import {
  useTheme,
  Button,
  Caption,
  Subheading,
  TextInput,
  Title
} from 'react-native-paper'
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
	const {
		colors: { background, primary }
	} = useTheme()

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

  navigation.setOptions({
	header: () => (
		null
	)
  })

	const onLoginButtonPress = async () => {
		await signIn({ email, password })
	}
	const onSignUpButtonPress = (): void => {
		navigation && navigation.navigate('SignUp')
	  }
	const onForgotPasswordButtonPress = (): void => {
		navigation && navigation.navigate('ForgotPassword')
	}

  return (
	<TextInputAvoidingView>
		{/* <ScrollView
		style={[styles.container, { backgroundColor: background }]}
		keyboardShouldPersistTaps={'always'}
		removeClippedSubviews={false}
		> */}
		<View style={[styles.headerContainer, { backgroundColor: primary }]}>
		<Title style={{ color: 'white' }}>
			Hello
		</Title>
		<Subheading
			style={[styles.signInLabel, { color: 'white' }]}
		  >
			Log in to your account
		</Subheading>
			</View>

		<View style={styles.formContainer}>
			<TextInput
				mode='outlined'
				label='Email'
				value={email}
				onChangeText={(text) => setEmail(text)}
				style={{ height: 40 }}
			/>
			<TextInput
				mode='outlined'
				label='Password'
				value={password}
				secureTextEntry={true}
				onChangeText={(text) => setPassword(text)}
				style={[styles.passwordInput, { height: 40 }]}
			/>
			<View style={styles.forgotPasswordContainer}>
			<Caption
			style={styles.forgotPasswordButton}
			onPress={onForgotPasswordButtonPress}>
			Forgot your password?
			</Caption>
		</View>
		</View>
		<Button mode='contained' onPress={onLoginButtonPress} style={styles.signInButton} >
			로그인
		</Button>
		<View style={styles.SignUpContainer}>
			<Caption onPress={onSignUpButtonPress} style={styles.signUpButton} >
				Don't have an account? Create
			</Caption>
		</View>
		{/* </ScrollView> */}
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
