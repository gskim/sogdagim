import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { FlatList } from 'react-native'
import { useTheme, Divider, List } from 'react-native-paper'
import { useSafeArea } from 'react-native-safe-area-context'

import AppBarExample from './AppBarExample'
import BottomNavigationScreen from './BottomNavigationScreen'
import LoginScreen from './LoginScreen'
import PostDetailScreen from './PostDetailScreen'
import PostListScreen from './PostListScreen'

export const screens: Record<
  string,
  React.ComponentType<any> & { title: string }
> = {
  Appbar: AppBarExample,
  BottomNavigation: BottomNavigationScreen,
  Login: LoginScreen,
  PostList: PostListScreen,
  PostDetail: PostDetailScreen

}

interface Props {
  navigation: StackNavigationProp<{ [key: string]: undefined }>
}

interface Item {
  id: string
  data: typeof screens[string]
}

const data = Object.keys(screens).map(
  (id): Item => ({ id, data: screens[id] })
)

export default function ScreenList({ navigation }: Props) {
  const renderItem = ({ item }: { item: Item }) => (
	<List.Item
		title={item.data.title}
		onPress={() => navigation.navigate(item.id)}
	/>
  )

  const keyExtractor = (item: { id: string }) => item.id

  const { colors } = useTheme()
  const safeArea = useSafeArea()

  return (
	<FlatList
		contentContainerStyle={{
		backgroundColor: colors.background,
		paddingBottom: safeArea.bottom
		}}
		ItemSeparatorComponent={Divider}
		renderItem={renderItem}
		keyExtractor={keyExtractor}
		data={data}
	/>
  )
}
