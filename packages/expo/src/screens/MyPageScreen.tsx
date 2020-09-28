import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaLayout } from '../components/SafeAreaLayout'
import { CommonProps } from '../CommonProps'

const MyPageScreen = (props: CommonProps): React.ReactElement => {

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

MyPageScreen.title = 'PostList'
export default MyPageScreen

const styles = StyleSheet.create({
	safeArea: {
		flex: 1
	}
})
