import { Button, Text } from '@ui-kitten/components'
import * as AppleAuthentication from 'expo-apple-authentication'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import styled from 'styled-components/native'
import { AuthContext } from '../contexts/AuthContext'
import { CommonProps } from '../CommonProps'

interface AvoidingViewProps {
	children: React.ReactNode
  }

const TextInputAvoidingView = ({ children }: AvoidingViewProps) => {
	return Platform.OS === 'ios' ? (
	  <IosKeyboardAvoidingView
		behavior='padding'
		keyboardVerticalOffset={80}
	  >
		{children}
	  </IosKeyboardAvoidingView>
	) : (
	  <>{children}</>
	)
}

const SnsLoginScreen = ({ navigation }: CommonProps) => {

	const { google, apple } = React.useContext(AuthContext)
	navigation.setOptions({
		header: () => (
			null
		)
	})
  return (
	<ContainerView>
		<HeaderView>
			<TitleText
			status='basic'
			category='h1'
			>SOGDAGIM</TitleText>
			<DescriptionText
			status='basic'
			category='h1'
			>우리 같이
				속닥여 볼까요?
			</DescriptionText>
		</HeaderView>
		<BodyView>
		</BodyView>
		<FooterView>
			<GoogleButton
			status='control'
			size='giant'
			onPress={google}
			>
				Google
			</GoogleButton>
			<AppleAuthentication.AppleAuthenticationButton
				buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
				buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
				cornerRadius={5}
				style={{ width: '100%', height: 45, marginTop: 16, marginHorizontal: 16 }}
				onPress={apple}
			/>
		</FooterView>
	</ContainerView>
  )
}

export default SnsLoginScreen

const ContainerView = styled.View`
	flex: 1;
`
const HeaderView = styled.View`
	margin-top: 30;
	justify-content: center;
	align-items: center;
	min-height: 216;
`

const TitleText = styled(Text)`
`
const DescriptionText = styled(Text)`
	margin-top: 16;
`

const BodyView = styled.View`
	flex: 1;
	margin-top: 32;
	padding-horizontal: 16px;
`

const FooterView = styled.View`
	margin-bottom: 20px;
`

const GoogleButton = styled(Button)`
	margin-horizontal: 16;
`

const AppleButton = styled(Button)`
	margin-horizontal: 16px;
	margin-top: 16px;
`

const IosKeyboardAvoidingView = styled(KeyboardAvoidingView)`
	flex: 1;
`
