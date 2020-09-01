import { GetAdminChatsMessagesResponse } from '@sogdagim/model'
import { LayoutType, PageComponent } from '@src/@types'
import { MyInfoContext } from '@src/contexts/MyInfoContext'
import { SocketContext } from '@src/contexts/SocketContext'
import ChatFetcher from '@src/fetchers/chat'
import { Avatar, Button, Col, Divider, Form, Input, List, Row, Select, Skeleton, Table, Tooltip, Typography } from 'antd'
import moment from 'moment'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import 'reflect-metadata'
import styled from 'styled-components'

const chatFetcher = new ChatFetcher()
const { Option } = Select

const Room: PageComponent<GetAdminChatsMessagesResponse & {userId: number, chatId: number}> = (props) => {
	console.log('props',props)
	const router = useRouter()
	const formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 12 }
	}
	const [form] = Form.useForm()
	const [messages, setMessages] = useState(props.messages)
	const socket = useContext(SocketContext)
	const myinfo = useContext(MyInfoContext)

	const isConnected = socket.connected
	console.log('isConnected', isConnected)
	socket.emit('entranceChat', { chatId: props.chatId })

	socket.on('sendSuccess', (data) => {
		console.log('sendSuccess', data)
	})

	socket.on('sendFailed', (data) => {
		console.log('sendFailed', data)
	})

	socket.on('receiveMessage', (data) => {
		console.log('receiveMessage')
		console.log(data)
	})


	const sendMessage = async (values) => {
		socket.emit('sendMessage', { chatId: props.chatId, data: values.message })
	}

	return (
		<>
		<Divider orientation='left' style={{ color: '#333', fontWeight: 'normal' }}>
				Room {props.chatId}
		</Divider>
		<Row justify='center'>
			<Col span={20}>
				<Form
					{...formItemLayout}
					size='large'
					form={form}
					name='chatUserAdd'
					onFinish={sendMessage}
					scrollToFirstError
				>
					<Form.Item
					name='message'
					label='message'
					>
					<Input />
					</Form.Item>
					<Form.Item label=' ' colon={false}>
					<Button type='primary' htmlType='submit'>
						등록
					</Button>
				</Form.Item>

				</Form>
			</Col>
			<Divider />
			<Col span={20} >
			<List
				className='message-list'
				// loading={initLoading}
				itemLayout='horizontal'
				// loadMore={loadMore}
				dataSource={messages}
				renderItem={(message) => {
					if (message.userId === props.userId) {
						return <List.Item style={{ direction: 'rtl', border: '1px solid red' }}>
								<p>{message.text}</p>
								</List.Item>
					} else {
						return (
							<List.Item>
								<Skeleton avatar title={false} loading={false} active>
								<List.Item.Meta
								avatar={
									<Avatar src={message.profilePhoto || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />
								}
								title={<a href={`/users/${message.userId}`}>{message.nickname}</a>}
								description={<p>{message.text}</p>}
								/>
								</Skeleton>
							</List.Item>
						)
					}
				}}
			/>
			</Col>
		</Row>
		</>
	)
}

Room.layoutType = LayoutType.기본화면
Room.isPublicPage = false

Room.getInitialProps = async (context: NextPageContext) => {
	chatFetcher.setContext(context)
	const res = await chatFetcher.getMessages(Number(context.query.id))
	return { ...res, chatId: Number(context.query.id), userId: Number(context.query.userId) }
}

export default Room
