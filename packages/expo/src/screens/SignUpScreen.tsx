import { HeaderBackButton } from '@react-navigation/stack'
import { Gender } from '@sogdagim/model'
import { useStyleSheet, Button as KittenButton, Icon, Input, Layout, StyleService } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import {
  useTheme,
  Button,
  TextInput
} from 'react-native-paper'
import { EmailIcon, EyeIcon, EyeOffIcon, PersonIcon, PlusIcon } from '../components/Icons'
import { KeyboardAvoidingView } from '../components/KeyboardAvoidingView'
import { ProfileAvatar } from '../components/ProfileAvatar'
import { CommonProps } from '../CommonProps'

const SignUpScreen = ({ navigation }: CommonProps) => {
	const styles = useStyleSheet(themedStyles)
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [nickname, setNickname] = useState<string>('')
	const [birthYear, setBirthYear] = useState<string>('')
	const [birthMomth, setBirthMonth] = useState<string>('')
	const [birthday, setBirthday] = useState<string>('')
	const [gender, setGender] = useState<Gender>()

	const [userName, setUserName] = React.useState<string>()
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false)
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false)

  navigation.setOptions({
	header: () => (
		<HeaderBackButton onPress={() => navigation.goBack()} />
	)
  })

  const { colors: { background, primary } } = useTheme()

	const signUpBtnClick = async () => {

	}

	const onSignUpButtonPress = (): void => {
		navigation && navigation.goBack()
	  }

	  const onSignInButtonPress = (): void => {
		navigation && navigation.navigate('SignIn2')
	  }

	  const onPasswordIconPress = (): void => {
		setPasswordVisible(!passwordVisible)
	  }
	const renderEditAvatarButton = (): React.ReactElement => (
		<KittenButton
		style={styles.editAvatarButton}
	  status='basic'
	  appearance='ghost'
	  accessoryLeft={PlusIcon}
	/>
	  )

	  const renderIcon = (props: any) => (
		<TouchableWithoutFeedback onPress={onPasswordIconPress}>
		  <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'}/>
		</TouchableWithoutFeedback>
	  )

  return (
	<KeyboardAvoidingView style={styles.container}>
		<View style={[styles.headerContainer, { backgroundColor: primary }]}>
		<ProfileAvatar
			style={[styles.profileAvatar, { tintColor: primary, backgroundColor: background }]}
			resizeMode='center'
			source={require('../../assets/images/image-person.png')}
			editButton={renderEditAvatarButton}
		/>
		</View>
		<Layout
		style={styles.formContainer}
		level='1'>
		<Input
			autoCapitalize='none'
			placeholder='User Name'
			accessoryRight={PersonIcon}
			value={userName}
			onChangeText={setUserName}
		/>
		<Input
			style={styles.emailInput}
			autoCapitalize='none'
			placeholder='Email'
			accessoryRight={EmailIcon}
			value={email}
			onChangeText={setEmail}
		/>
		<Input
			style={styles.passwordInput}
			autoCapitalize='none'
			secureTextEntry={!passwordVisible}
			placeholder='Password'
			accessoryRight={renderIcon}
			value={password}
			onChangeText={setPassword}
		/>
			<Button mode='contained' onPress={signUpBtnClick} style={{ marginTop: 20 }}>
				회원가입
  			</Button>
		</Layout>
	</KeyboardAvoidingView>
  )
}

SignUpScreen.title = 'SignUp'

export default SignUpScreen

const themedStyles = StyleService.create({
	container: {
	  },
	  headerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 216
	  },
	  profileAvatar: {
		width: 116,
		height: 116,
		borderRadius: 58,
		alignSelf: 'center'
	  },
	  editAvatarButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'gainsboro'
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
