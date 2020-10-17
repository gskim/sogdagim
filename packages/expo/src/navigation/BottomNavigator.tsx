import { BottomNavigation, BottomNavigationTab, Divider, Text } from '@ui-kitten/components'
import React from 'react'
import { ColorPaletteIcon, LayoutIcon, StarOutlineIcon } from '../components/Icons'
import { SafeAreaLayout } from '../components/SafeAreaLayout'

export const HomeBottomNavigation = (props): React.ReactElement => {

  const onSelect = (index: number): void => {
	props.navigation.navigate(props.state.routeNames[index])
  }

  return (
	  <SafeAreaLayout insets='top'>
		<BottomNavigation
		appearance='noIndicator'
		selectedIndex={props.state.index}
		onSelect={onSelect}>
		<BottomNavigationTab
			icon={LayoutIcon}
		/>
		<BottomNavigationTab
			icon={StarOutlineIcon}
		/>
		<BottomNavigationTab
			icon={ColorPaletteIcon}
		/>
		</BottomNavigation>
		</SafeAreaLayout>
  )
}
