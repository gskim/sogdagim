import React from 'react'
import {NavigationScreenConfig, NavigationScreenProps} from 'react-navigation'
import {
	Profile,
	ProfileSocials,
	Post,
} from '@src/core/model'
import {
	profile1,
	profileSocials1,
} from '@src/core/data/profile'
import {posts} from '@src/core/data/post'
import {Profile1} from './profile1.component'
import {TopNavigationElement} from '@src/core/navigation/options'
import {Profile1Header} from '@src/containers/layouts/social/profile1/profile1.header'

interface Profile1NavigationStateParams {
	onBack: () => void
	onSettingsPress: () => void
}

interface State {
	profile: Profile
	socials: ProfileSocials
	posts: Post[]
}

export class Profile1Container extends React.Component<NavigationScreenProps, State> {

	static navigationOptions: NavigationScreenConfig<any> = ({navigation, screenProps}) => {
		const profile1HeaderConfig: Profile1NavigationStateParams = {
			onBack: navigation.getParam('onBack'),
			onSettingsPress: navigation.getParam('onSearchPress'),
			// onSettingsPress: console.log('here!!! navigationOptions onSettingsPress'),

			// onSettingsPress: navigation.navigate({
			// 	routeName: '프로필수정',
			// }),
		}

		const renderHeader = (headerProps: NavigationScreenProps,
							  config: Profile1NavigationStateParams) => {

			return (
				<Profile1Header
					{...headerProps}
					onSettingsPress={config.onSettingsPress}
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
			onSearchPress: this.onSearchPress,
			onBack: this.onBackPress,
		})
	}

	private onBackPress = (): void => {
		this.props.navigation.goBack(null)
	}

	private onSearchPress = (): void => {
		this.props.navigation.navigate({
			routeName: '프로필수정',
		})
	}

	public state: State = {
		profile: profile1,
		socials: profileSocials1,
		posts: posts,
	}

	private navigationKey: string = 'Profile1Container'

	private onFollowersPress = () => {
	}

	private onFollowingPress = () => {
	}

	private onPostsPress = () => {
	}

	private onFollowPress = () => {
	}

	private onPostPress = (index: number) => {
	}

	private onPostLikePress = (index: number) => {
	}

	public render(): React.ReactNode {
		return (
			<Profile1
				profile={this.state.profile}
				socials={this.state.socials}
				posts={this.state.posts}
				onFollowersPress={this.onFollowersPress}
				onFollowingPress={this.onFollowingPress}
				onPostsPress={this.onPostsPress}
				onFollowPress={this.onFollowPress}
				onPostPress={this.onPostPress}
				onPostLikePress={this.onPostLikePress}
			/>
		)
	}
}
