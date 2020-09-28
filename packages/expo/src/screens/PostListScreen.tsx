import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaLayout } from '../components/SafeAreaLayout'
import { CommonProps } from '../CommonProps'

const PostListScreen = (props: CommonProps): React.ReactElement => {

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

PostListScreen.title = 'PostList'
export default PostListScreen

const styles = StyleSheet.create({
	safeArea: {
		flex: 1
	}
})
