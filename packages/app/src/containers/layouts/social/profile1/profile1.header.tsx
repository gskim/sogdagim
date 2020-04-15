import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {
	ThemedComponentProps,
	ThemeType,
	withStyles,
} from '@kitten/theme'
import {
	TopNavigationActionProps,
	TopNavigationAction,
	TopNavigation,
} from '@kitten/ui'
import { SafeAreaView } from '@src/core/navigation'
import {
	ArrowIosBackFill, GridIconOutline,
} from '@src/assets/icons'

interface ComponentProps {
	onBack: () => void
	onSettingsPress: () => void
}

export type Profile1HeaderProps = ThemedComponentProps & ComponentProps & NavigationScreenProps

class Profile1HeaderComponent extends React.Component<Profile1HeaderProps> {

	private onSettingsPress = (): void => {
		this.props.onSettingsPress()
	}

	private onBack = (): void => {
		this.props.onBack()
	}

	// private renderLeftControl = (): React.ReactElement<TopNavigationActionProps> => {
	// 	return (
	// 		<TopNavigationAction
	// 			icon={ArrowIosBackFill}
	// 			onPress={this.onBack}
	// 		/>
	// 	)
	// }

	private renderRightControls = (): React.ReactElement<TopNavigationActionProps>[] => {
		return ([
			<TopNavigationAction
				icon={GridIconOutline}
				onPress={this.onSettingsPress}
			/>,
		])
	}

	public render(): React.ReactNode {
		const { themedStyle } = this.props

		return (
			<SafeAreaView style={themedStyle.container}>
				<TopNavigation
					alignment='center'
					title=''
					// leftControl={this.renderLeftControl()}
					rightControls={this.renderRightControls()}
				/>
			</SafeAreaView>
		)
	}
}

export const Profile1Header = withStyles(Profile1HeaderComponent, (theme: ThemeType) => ({
	container: {
		backgroundColor: theme['background-basic-color-1'],
	},
}))

