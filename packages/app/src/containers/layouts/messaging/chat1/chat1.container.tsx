import React from 'react'
import {
	NavigationScreenProps,
	NavigationScreenConfig, NavigationActions,
} from 'react-navigation'
import {
  ChatHeader,
  ChatHeaderNavigationStateParams,
} from '@src/components/messaging'
import {
  Conversation,
  Message,
  Profile,
} from '@src/core/model'
import { conversation5 } from '@src/core/data/conversation'
import {
  profile1,
  profile2,
} from '@src/core/data/profile'
import { Chat1 } from './chat1.component'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient('http://210.217.2.138:3000', {
  transports: ['websocket'],
  autoConnect: false,
})

interface State {
  newMessageText: string
  conversation: Conversation
}

export class Chat1Container extends React.Component<NavigationScreenProps, State> {

  public state: State = {
	newMessageText: '',
	conversation: conversation5,
  }

  public async componentDidMount() {
	console.log('componentDidMount')

	try {
		socket.connect()
		socket.emit('sendMessage', {msg: 'ㅠ.ㅠ'})
		console.log('----------12------------')
		socket.on('receiveMessage', ((data) => { console.log(data) }))
		const result = await fetch('http://210.217.2.138:3000/test')
		console.log(await result.json())
	} catch (error) {
		console.log(error)
	}

  }

  static navigationOptions: NavigationScreenConfig<any> = ({ navigation, screenProps }) => {
	const headerProps: ChatHeaderNavigationStateParams = {
		interlocutor: navigation.getParam('interlocutor', conversation5.interlocutor),
		lastSeen: navigation.getParam('lastSeen', 'today'),
		onBack: navigation.getParam('onBack'),
		onProfile: navigation.getParam('onProfile'),
	}

	const header = (navigationProps: NavigationScreenProps) => {
		return (
		<ChatHeader
			{...navigationProps}
			{...headerProps}
		/>
		)
	}

	return { ...navigation, ...screenProps, header }
  };

  public componentWillMount(): void {
	console.log('componentWillMount')
	this.props.navigation.setParams({
		interlocutor: this.state.conversation.interlocutor,
		lastSeen: this.state.conversation.lastSeen,
		onBack: this.onBackPress,
		onProfile: this.onProfilePress,
	})
  }

  private onProfilePress = (profile: Profile): void => {
	this.props.navigation.navigate('Test Profile')
  };

  private onNewMessageChange = (newMessageText: string): void => {
	console.log('onNewMessageChange')
	this.setState({ newMessageText })
  };

  private onMessageAddPress = (): void => {
	const profiles: Profile[] = [profile1, profile2]
	const newMessage: Message = {
		author: profiles[Math.floor(Math.random() * profiles.length)],
		text: this.state.newMessageText,
		date: '15:01 PM',
		read: true,
		delivered: true,
	}
	const conversationCopy: Conversation = this.state.conversation
	conversationCopy.messages.push(newMessage)
	this.setState({
		conversation: conversationCopy,
		newMessageText: '',
	})
	console.log('onMessageAddPress')
	socket.emit('sendMessage', newMessage)
  };

  private onBackPress = (): void => {
	this.props.navigation.goBack(null)
  };

  public render(): React.ReactNode {
	return (
		<Chat1
		conversation={this.state.conversation}
		newMessage={this.state.newMessageText}
		onNewMessageChange={this.onNewMessageChange}
		onMessageAdd={this.onMessageAddPress}
		/>
	)
  }
}
