import React from 'react'
import {NavigationScreenConfig, NavigationScreenProps} from 'react-navigation'
import {Profile} from '@src/core/model'
import {profile1} from '@src/core/data/profile'
import {ProfileSettings1} from './profileSettings1.component'
import {Profile1Header} from '@src/containers/layouts/social/profile1/profile1.header'
import {TopNavigationElement} from '@src/core/navigation/options'
import {ProfileSettings1Header} from '@src/containers/layouts/social/profileSettings1/profileSettings1.header'

interface State {
	profile: Profile
}

interface ProfileSettings1NavigationStateParams {
	onBack: () => void
	onSearchPress: () => void
}

export class ProfileSettings1Container extends React.Component<NavigationScreenProps, State> {

	static navigationOptions: NavigationScreenConfig<any> = ({navigation, screenProps}) => {
		const profile1HeaderConfig: ProfileSettings1NavigationStateParams = {
			onBack: navigation.getParam('onBack'),
			onSearchPress: navigation.getParam('onSearchPress'),
		}

		const renderHeader = (headerProps: NavigationScreenProps,
							  config: ProfileSettings1NavigationStateParams) => {

			return (
				<ProfileSettings1Header
					{...headerProps}
					// onSearchPress={config.onSearchPress}
					onBack={config.onBack}
				/>
			)
		}

		return {
			...navigation,
			...screenProps,
			header: (headerProps: NavigationScreenProps): TopNavigationElement => {
				return renderHeader(headerProps, profile1HeaderConfig)
			},
		}
	}

	public componentWillMount(): void {
		this.props.navigation.setParams({
			// onSearchPress: this.onSearchPress,
			onBack: this.onBackPress,
		})
	}

	public state: State = {
		profile: profile1,
	}

	private navigationKey: string = 'ProfileSettings1Container'

	private onBackPress = (): void => {
		this.props.navigation.goBack(null)
	};

	private onUploadPhotoButtonPress = () => {
	}

	private onButtonPress = () => {
		this.props.navigation.goBack()
	}

	public render(): React.ReactNode {
		return (
			<ProfileSettings1
				profile={this.state.profile}
				onUploadPhotoButtonPress={this.onUploadPhotoButtonPress}
				onButtonPress={this.onButtonPress}
			/>
		)
	}
}
