import { Divider, List, ListItem, Text, TopNavigation } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaLayout } from '../components/SafeAreaLayout'
import { CommonProps } from '../CommonProps'

const data = new Array(8).fill({
	title: 'Title for Item',
	description: 'Description for Item'
  })

const PostListScreen = (props: CommonProps): React.ReactElement => {

	props.navigation.setOptions({
		header: () => (
			null
		)
	})

	const renderItem = ({ item, index }) => (
		<ListItem
		  title={`${item.title} ${index + 1}`}
		  description={`${item.description} ${index + 1}`}
		/>
	  )

	return (
	<SafeAreaLayout
	style={styles.safeArea}
	insets='top'
	>
		<TopNavigation
			alignment='center'
			title='SOGDAGIM'
		/>
		<Divider />
		<List
			data={data}
			renderItem={renderItem}
		/>
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
