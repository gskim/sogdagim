import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
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

	const { signIn } = React.useContext(AuthContext)
	navigation.setOptions({
		header: () => (
			null
		)
	})
  return (
	<TextInputAvoidingView>
		<BodyView>
		<HeaderView></HeaderView>
				<CenterView></CenterView>
				<FooterView></FooterView>
		</BodyView>
	</TextInputAvoidingView>
  )
}

SnsLoginScreen.title = 'Login'
export default SnsLoginScreen

const BodyView = styled.View`
	background: white;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
`

const BodyView2 = styled.View`
	flex: 1;
	background: black;
`

const FooterView = styled.View`
	height: 100;
	margin-top: auto;
	background: red;
`

const CenterView = styled.View`
	background: yellow;
	height: 100;
	align-self: center;
`

const HeaderView = styled.View`
	background: green;
	height: 100;
	margin-bottom: auto;
`

const IosKeyboardAvoidingView = styled(KeyboardAvoidingView)`
	flex: 1;
`
