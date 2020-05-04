// @generated: @expo/next-adapter@2.1.3
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { withTheme, Button } from 'react-native-paper'
const Index = () => {
  return (
	<View style={styles.container}>
		<Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>
		<Button >
		Press me
	</Button>
	</View>
  )
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
  },
  text: {
	fontSize: 16
  }
})

export default withTheme(Index)
