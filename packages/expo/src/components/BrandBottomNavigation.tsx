import { BottomNavigation, BottomNavigationProps, ThemeProvider } from '@ui-kitten/components'
import React from 'react'
import { Theming } from '../services/Theme'

export const BrandBottomNavigation = (props: BottomNavigationProps): React.ReactElement => {

  const brandTheme = Theming.useTheme('brand')

  return (
	<ThemeProvider theme={brandTheme}>
		<BottomNavigation {...props}/>
	</ThemeProvider>
  )
}
