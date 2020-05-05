import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { FlatList } from 'react-native'
import { useTheme, Divider, List } from 'react-native-paper'
import { useSafeArea } from 'react-native-safe-area-context'

import AppbarExample from './Examples/AppbarExample'
import BottomNavigationExample from './Examples/BottomNavigationExample'

export const examples: Record<
  string,
  React.ComponentType<any> & { title: string }
> = {
  appbar: AppbarExample,
  bottomNavigation: BottomNavigationExample

}

interface Props {
  navigation: StackNavigationProp<{ [key: string]: undefined }>
}

interface Item {
  id: string
  data: typeof examples[string]
}

const data = Object.keys(examples).map(
  (id): Item => ({ id, data: examples[id] })
)

export default function ExampleList({ navigation }: Props) {
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
