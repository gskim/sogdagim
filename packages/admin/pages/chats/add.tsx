import { ChatType } from '@sogdagim/model'
import { LayoutType, PageComponent } from '@src/@types'
import ChatFetcher from '@src/fetchers/chat'
import { Button, Col, Divider, Form, Input, InputNumber, Row, Select } from 'antd'
import { NextPageContext } from 'next'
import Router from 'next/router'
import React from 'react'
import styled from 'styled-components'

const chatFetcher = new ChatFetcher()
const { Option } = Select

const ChatAdd: PageComponent = (props) => {
	const formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 12 }
	}

	const [form] = Form.useForm()
	const onFinish = async (values) => {
		const response = await chatFetcher.addChat(values)
		console.log('finish')
		console.log(response)
		Router.push(`/chats`)
	}
	return (
		<>
		<Divider orientation='left' style={{ color: '#333', fontWeight: 'normal' }}>
				Chat Add
		</Divider>
		<Row justify='center'>
			<Col span={20}>
			<Form
				{...formItemLayout}
				size='large'
				form={form}
				name='chatAdd'
				onFinish={onFinish}
				initialValues={{ type: ChatType.PUBLIC }}
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
					<span>내용</span>
				}
				rules={[{ required: true, message: '내용 입력은 필수입니다.' }]}
				>
				<Input.TextArea autoSize />
				</Form.Item>
				<Form.Item
					label='type'
					name='type'
					rules={[{ required: true, message: '공개상태 입력을 필수입니다.' }]}
				>
					<Select style={{ width: '100%' }}>
						<Option value={ChatType.PUBLIC}>공개</Option>
						<Option value={ChatType.PRIVATE}>비공개</Option>
					</Select>
				</Form.Item>
				<Form.Item
					name='maxPersons'
					label='최대인원수'
				>
					<InputNumber />
				</Form.Item>
				<Form.Item
					name='password'
					label='비밀번호'
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='createUserId'
					label='생성UserId'
				>
					<InputNumber  />
				</Form.Item>
				<Form.Item colon={false} label=' '>
					<Button type='primary' htmlType='submit'>
						등록
					</Button>
				</Form.Item>
			</Form>
			</Col>
		</Row>
		</>
	)
}

ChatAdd.layoutType = LayoutType.기본화면
ChatAdd.isPublicPage = false

ChatAdd.getInitialProps = async (context: NextPageContext) => {
	chatFetcher.setContext(context)
	return {}
}

export default ChatAdd
