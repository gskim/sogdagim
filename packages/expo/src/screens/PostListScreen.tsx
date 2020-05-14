import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types'
import { PostItem } from '@sogdagim/model'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet } from 'react-native'
import {
  useTheme,
  Avatar,
  Button,
  Card,
  IconButton,
  Paragraph
} from 'react-native-paper'
import PostFetcher from '../fetchers/PostFetcher'
const postFetcher = new PostFetcher()
interface Props {
	navigation: StackNavigationProp<{ [key: string]: undefined }>
  }
const PostListScreen = ({ navigation }: Props) => {
  const {
	colors: { background }
  } = useTheme()

  const [posts, setPosts] = useState<PostItem[]>([])

  useEffect(() => {
	const getPosts = async () => {
		const res = await postFetcher.posts()
		setPosts(res.posts)
	}
	getPosts()
  }, [])

  return (
	<ScrollView
		style={[styles.container, { backgroundColor: background }]}
		contentContainerStyle={styles.content}
	>
		{
			posts.map((post) => {
				return (
				<Card
					key={post.id}
					style={styles.card}
					onPress={() => {
						console.log('=====')
						navigation.navigate('PostDetail', { id: post.id })
					}}
				>
					<Card.Cover source={require('../../assets/images/chameleon.jpg')} />
					<Card.Title title={post.title} />
					<Card.Content>
						<Paragraph>
						{post.text}
						</Paragraph>
					</Card.Content>
				</Card>
				)

			})
		}
		<Card style={styles.card}>
		<Card.Cover source={require('../../assets/images/wrecked-ship.jpg')} />
		<Card.Title title='Abandoned Ship' />
		<Card.Content>
			<Paragraph>
			The Abandoned Ship is a wrecked ship located on Route 108 in Hoenn,
			originally being a ship named the S.S. Cactus. The second part of
			the ship can only be accessed by using Dive and contains the
			Scanner.
			</Paragraph>
		</Card.Content>
		</Card>
		<Card style={styles.card}>
		<Card.Cover source={require('../../assets/images/forest.jpg')} />
		<Card.Actions>
			<Button onPress={() => {}}>Share</Button>
			<Button onPress={() => {}}>Explore</Button>
		</Card.Actions>
		</Card>
		<Card style={styles.card}>
		<Card.Title
			title='Berries that are trimmed at the end'
			subtitle='Omega Ruby'
			left={(props: any) => <Avatar.Icon {...props} icon='folder' />}
			right={(props: any) => (
			<IconButton {...props} icon='dots-vertical' onPress={() => {}} />
			)}
		/>
		<Card.Content>
			<Paragraph>
			Dotted around the Hoenn region, you will find loamy soil, many of
			which are housing berries. Once you have picked the berries, then
			you have the ability to use that loamy soil to grow your own
			berries. These can be any berry and will require attention to get
			the best crop.
			</Paragraph>
		</Card.Content>
		</Card>
		<Card style={styles.card}>
		<Card.Cover source={require('../../assets/images/strawberries.jpg')} />
		<Card.Title
			title='Just Strawberries'
			subtitle='... and only Strawberries'
			right={(props: any) => (
			<IconButton {...props} icon='chevron-down' onPress={() => {}} />
			)}
		/>
		</Card>
		<Card
		style={styles.card}
		onPress={() => {
			Alert.alert('The Chameleon is Pressed')
		}}
		>
		<Card.Cover source={require('../../assets/images/chameleon.jpg')} />
		<Card.Title title='Pressable Chameleon' />
		<Card.Content>
			<Paragraph>
			This is a pressable chameleon. If you press me, I will alert.
			</Paragraph>
		</Card.Content>
		</Card>
		<Card
		style={styles.card}
		onLongPress={() => {
			Alert.alert('The City is Long Pressed')
		}}
		>
		<Card.Cover source={require('../../assets/images/city.jpg')} />
		<Card.Title
			title='Long Pressable City'
			left={(props) => <Avatar.Icon {...props} icon='city' />}
		/>
		<Card.Content>
			<Paragraph>
			This is a long press only city. If you long press me, I will alert.
			</Paragraph>
		</Card.Content>
		</Card>
	</ScrollView>
  )
}

PostListScreen.title = 'PostList'

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

export default PostListScreen
