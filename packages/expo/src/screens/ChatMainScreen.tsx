import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaLayout } from '../components/SafeAreaLayout'
import { CommonProps } from '../CommonProps'

const ChatMainScreen = (props: CommonProps): React.ReactElement => {

	props.navigation.setOptions({
		header: () => (
			null
		)
	})
  return (
	<SafeAreaLayout
	style={styles.safeArea}
	insets='top'
	>
	</SafeAreaLayout>

  )
}

ChatMainScreen.title = 'PostList'
export default ChatMainScreen

const styles = StyleSheet.create({
	safeArea: {
		flex: 1
	}
})
