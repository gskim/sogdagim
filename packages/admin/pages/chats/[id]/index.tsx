import { QuestionCircleOutlined } from '@ant-design/icons'
import { ChatType, GetAdminChatsDetailResponse } from '@sogdagim/model'
import { LayoutType, PageComponent } from '@src/@types'
import ChatFetcher from '@src/fetchers/chat'
import PostFetcher from '@src/fetchers/post'
import { Avatar, Button, Col, Divider, Form, Input, List, Row, Select, Skeleton, Table, Tooltip, Typography } from 'antd'
import moment from 'moment'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import 'reflect-metadata'
import styled from 'styled-components'

const chatFetcher = new ChatFetcher()
const { Option } = Select

const ChatEdit: PageComponent<GetAdminChatsDetailResponse> = (props) => {
	const router = useRouter()
	const formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 12 }
	}
	const [form] = Form.useForm()
	const [addUserForm] = Form.useForm()
	const [users, setUsers] = useState(props.data.users)

	const onFinish = async (values) => {
		// const res = await postFetcher.modifyPost(props.data.id, values)
		// const formData = {
		// 	...res.data, createdAt: moment(res.data.createdAt).format('YYYY-MM-DD HH:mm:ss') , updatedAt: moment(res.data.updatedAt).format('YYYY-MM-DD HH:mm:ss')
		// }
		// form.setFieldsValue(formData)
	}

	const addUser = async (values) => {
		const reloadUsers = await chatFetcher.addUser(props.data.id, Number(values.userId))
		setUsers(reloadUsers.users)
	}

	return (
		<>
		<Divider orientation='left' style={{ color: '#333', fontWeight: 'normal' }}>
				Chat Edit
		</Divider>
		<Row justify='center'>
			<Col span={20}>
			<Form
				{...formItemLayout}
				size='large'
				form={form}
				name='chatEdit'
				onFinish={onFinish}
				initialValues={{
					...props.data
				}}
				scrollToFirstError
			>
				<Form.Item
				name='name'
				label='제목'
				rules={[
					{
					required: true,
					message: '제목 입력은 필수입니다.'
					}
				]}
				hasFeedback
				>
				<Input />
				</Form.Item>

				<Form.Item
				name='description'
				label={
					<span>
					내용&nbsp;
					<Tooltip title='내용을 입력해주세요'>
						<QuestionCircleOutlined />
					</Tooltip>
					</span>
				}
				rules={[{ required: true, message: '내용 입력은 필수입니다.' }]}
				>
				<Input.TextArea autoSize minLength={10} />
				</Form.Item>
				<Form.Item
					label='타입'
					name='type'
					rules={[{ required: true, message: '타입 선택은 필수입니다.' }]}
				>
					<Select style={{ width: '100%' }}>
						<Option value={ChatType.PUBLIC}>오픈채팅</Option>
						<Option value={ChatType.PRIVATE}>비공개채팅</Option>
						<Option value={ChatType.RANDOM}>랜덤채팅</Option>
						<Option value={ChatType.CLOSE}>종료</Option>
					</Select>
				</Form.Item>

				<Form.Item
				name='maxPersons'
				label='최대인원'
				rules={[
					{
					type: 'number',
					required: true,
					message: '최대인원은 필수입니다.'
					}
				]}
				hasFeedback
				>
				<Input />
				</Form.Item>

				<Form.Item label=' ' colon={false}>
					<Button type='primary' htmlType='submit'>
						수정
					</Button>
				</Form.Item>
			</Form>
			</Col>
			<Col span={20}>
				<Form
					{...formItemLayout}
					size='large'
					form={addUserForm}
					name='chatUserAdd'
					onFinish={addUser}
					scrollToFirstError
				>
					<Form.Item
					name='userId'
					label='User ID'
					rules={[
						{
						type: 'number',
						transform: ((v) => Number(v)),
						required: true,
						message: 'User ID 는 필수입니다.'
						}
					]}
					hasFeedback
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
			<Col span={20} >
			<List
				className='chat-user-list'
				// loading={initLoading}
				itemLayout='horizontal'
				// loadMore={loadMore}
				dataSource={users}
				renderItem={(user) => (
				<List.Item
					actions={[<a href={`/chats/${props.data.id}/room/${user.id}`} key='chat-user-entrance'>Entrance</a>, <a key='chat-user-exit'>Exit</a>]}
				>
					<Skeleton avatar title={false} loading={false} active>
					<List.Item.Meta
						avatar={
							<Avatar src={user.profilePhoto || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />
						}
						title={<a href={`/users/${user.id}`}>{user.nickname}</a>}
						description='Ant Design, a design language for background applications, is refined by Ant UED Team'
					/>
					</Skeleton>
				</List.Item>
				)}
			/>
			</Col>
		</Row>
		</>
	)
}

ChatEdit.layoutType = LayoutType.기본화면
ChatEdit.isPublicPage = false

ChatEdit.getInitialProps = async (context: NextPageContext) => {
	chatFetcher.setContext(context)
	const res = await chatFetcher.getChat(Number(context.query.id))
	return { ...res }
}

export default ChatEdit
