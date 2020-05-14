import { useRoute } from '@react-navigation/native'
import { PostItem } from '@sogdagim/model'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import {
  useTheme,
  Card,
  Paragraph
} from 'react-native-paper'
import PostFetcher from '../fetchers/PostFetcher'
const postFetcher = new PostFetcher()
const PostDetailScreen = () => {
  const {
	colors: { background }
  } = useTheme()

  const [post, setPost] = useState<PostItem>()
  const route = useRoute()
  const params = route.params as { id: number }

  useEffect(() => {
	const getPosts = async () => {
		const res = await postFetcher.postDetail(params.id)
		setPost(res.data)
	}
	getPosts()
  }, [])

  if (!post) return null

  return (
	<ScrollView
		style={[styles.container, { backgroundColor: background }]}
		contentContainerStyle={styles.content}
	>
		<Card
			key={post.id}
			style={styles.card}
		>
		<Card.Cover source={require('../../assets/images/wrecked-ship.jpg')} />
		<Card.Title title={post.title} />
		<Card.Content>
			<Paragraph>
				{post.text}
			</Paragraph>
		</Card.Content>
		</Card>

	</ScrollView>
  )
}

PostDetailScreen.title = 'PostDetail'

const styles = StyleSheet.create({
  container: {
	flex: 1
  },
  content: {
	padding: 4
  },
  card: {
	margin: 4
  }
})

export default PostDetailScreen
