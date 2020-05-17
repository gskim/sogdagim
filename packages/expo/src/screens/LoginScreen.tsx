import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import {
  useTheme,
  Button,
  Divider,
  TextInput
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

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

  navigation.setOptions({
	header: () => (
		null
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
				placeholder='이메일을 입력해주세요.'
				onChangeText={(text) => setEmail(text)}
				style={{ height: 40 }}
			/>
			<TextInput
				mode='outlined'
				label='Password'
				value={password}
				secureTextEntry={true}
				placeholder='비밀번호를 입력해주세요.'
				onChangeText={(text) => setPassword(text)}
				style={{ height: 40 }}
			/>
			<Button mode='contained' onPress={loginBtnClick} style={{ marginTop: 20 }}>
				로그인
  			</Button>
			  <Divider />
			  <Button mode='contained' onPress={loginBtnClick} style={{ marginTop: 20 }}>
				회원가입
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
		display: 'flex'
	},
	wrapper: {
		flex: 1
	},
	formContainer: {
		flex: 1,
		margin: 'auto'
	}
})
