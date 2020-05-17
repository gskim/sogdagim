import { HeaderBackButton } from '@react-navigation/stack'
import { Gender } from '@sogdagim/model'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'
import {
  useTheme,
  Button,
  TextInput
} from 'react-native-paper'
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

const SignUpScreen = ({ navigation }: CommonProps) => {

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [nickname, setNickname] = useState<string>('')
	const [birthYear, setBirthYear] = useState<string>('')
	const [birthMomth, setBirthMonth] = useState<string>('')
	const [birthday, setBirthday] = useState<string>('')
	const [gender, setGender] = useState<Gender>()

  navigation.setOptions({
	header: () => (
		<HeaderBackButton onPress={() => navigation.goBack()} />
	)
  })

  const {
	colors: { background }
  } = useTheme()

	const signUpBtnClick = async () => {

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
			<TextInput
				mode='outlined'
				label='Confirm Password'
				value={confirmPassword}
				secureTextEntry={true}
				placeholder='같은 비밀번호를 한번더 입력해주세요.'
				onChangeText={(text) => setConfirmPassword(text)}
				style={{ height: 40 }}
			/>
			<TextInput
				mode='outlined'
				label='닉네임'
				value={nickname}
				placeholder='닉네임을 입력해주세요.'
				onChangeText={(text) => setNickname(text)}
				style={{ height: 40 }}
			/>
			<Button mode='contained' onPress={signUpBtnClick} style={{ marginTop: 20 }}>
				회원가입
  			</Button>
		</View>
		</ScrollView>
	</TextInputAvoidingView>
  )
}

SignUpScreen.title = 'SignUp'

export default SignUpScreen

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	wrapper: {
		flex: 1
	},
	formContainer: {
		flex: 1,
		alignItems: 'center',
		padding: 16,
		justifyContent: 'center'
	}
})
