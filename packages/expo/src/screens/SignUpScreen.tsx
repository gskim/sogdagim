import { HeaderBackButton } from '@react-navigation/stack'
import { Gender } from '@sogdagim/model'
import React, { useState } from 'react'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import {
  useTheme,
  Button,
  TextInput
} from 'react-native-paper'
import { KeyboardAvoidingView } from '../components/KeyboardAvoidingView'
import { CommonProps } from '../CommonProps'

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
	<KeyboardAvoidingView style={styles.container}>
		<View style={styles.headerContainer}>
		<ProfileAvatar
			style={styles.profileAvatar}
			resizeMode='center'
			source={require('./assets/image-person.png')}
			editButton={renderEditAvatarButton}
		/>
		</View>
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
	</KeyboardAvoidingView>
  )
}

SignUpScreen.title = 'SignUp'

export default SignUpScreen

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'background-basic-color-1'
	  },
	  headerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 216,
		backgroundColor: 'color-primary-default'
	  },
	  profileAvatar: {
		width: 116,
		height: 116,
		borderRadius: 58,
		alignSelf: 'center',
		backgroundColor: 'background-basic-color-1',
		tintColor: 'color-primary-default'
	  },
	  editAvatarButton: {
		width: 40,
		height: 40,
		borderRadius: 20
	  },
	  formContainer: {
		flex: 1,
		paddingTop: 32,
		paddingHorizontal: 16
	  },
	  emailInput: {
		marginTop: 16
	  },
	  passwordInput: {
		marginTop: 16
	  },
	  termsCheckBox: {
		marginTop: 24
	  },
	  termsCheckBoxText: {
		color: 'text-hint-color'
	  },
	  signUpButton: {
		marginHorizontal: 16
	  },
	  signInButton: {
		marginVertical: 12,
		marginHorizontal: 16
	  }
})
