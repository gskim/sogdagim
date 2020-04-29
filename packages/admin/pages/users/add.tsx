import { CommonUser } from '@sogdagim/model/models/app'
import { PageComponent } from '@src/@types'
import UserFetcher from '@src/fetchers/user'
import { Button, Checkbox, Col, Divider, Form, Input, Row, Select, Table, Tooltip, Typography } from 'antd'
import { NextPageContext } from 'next'
import React from 'react'
const userFetcher = new UserFetcher()
const { Option } = Select
import { QuestionCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const UserAdd: PageComponent = (props) => {
	const formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 12 }
	}
	const tailFormItemLayout = {
		wrapperCol: {
			span: 24,
			offset: 0
		}
	}
	const [form] = Form.useForm()
	const onFinish = (values) => {
		console.log('Received values of form: ', values)
	  }
	return (
		<>
		<Divider orientation='left' style={{ color: '#333', fontWeight: 'normal' }}>
				User Add
		</Divider>
		<Row justify='center'>
			<Col span={24}>
			<Form
				{...formItemLayout}
				size='large'
				form={form}
				name='userAdd'
				onFinish={onFinish}
				initialValues={{
				residence: ['zhejiang', 'hangzhou', 'xihu'],
				prefix: '86'
				}}
				scrollToFirstError
			>
				<Form.Item
				name='email'
				label='E-mail'
				rules={[
					{
					type: 'email',
					message: 'The input is not valid E-mail!'
					},
					{
					required: true,
					message: 'Please input your E-mail!'
					}
				]}
				>
				<Input />
				</Form.Item>

				<Form.Item
				name='password'
				label='Password'
				rules={[
					{
					required: true,
					message: 'Please input your password!'
					}
				]}
				hasFeedback
				>
				<Input.Password />
				</Form.Item>

				<Form.Item
				name='confirm'
				label='Confirm Password'
				dependencies={['password']}
				hasFeedback
				rules={[
					{
					required: true,
					message: 'Please confirm your password!'
					},
					({ getFieldValue }) => ({
					validator(rule, value) {
						if (!value || getFieldValue('password') === value) {
						return Promise.resolve()
						}
						return Promise.reject('The two passwords that you entered do not match!')
					}
					})
				]}
				>
				<Input.Password />
				</Form.Item>

				<Form.Item
				name='nickname'
				label={
					<span>
					Nickname&nbsp;
					<Tooltip title='What do you want others to call you?'>
						<QuestionCircleOutlined />
					</Tooltip>
					</span>
				}
				rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
				>
				<Input />
				</Form.Item>
				<Form.Item
				label='gender'
				>
				<Row justify='center' gutter={40}>
					<Col span={12}>
						<Form.Item
							name='gender'
							rules={[{ required: true, message: 'Please input the captcha you got!' }]}
						>
							<Select style={{ width: '100%' }}>
								<Option value='m'>남</Option>
								<Option value='w'>여</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
						label='birth'
						>
							<Form.Item
							name='birthYear'
							noStyle
							rules={[{ required: true, message: 'Please input the captcha you got!' }]}
						>
							<Select style={{ width: '33%' }}>
								<Option value='m'>남</Option>
								<Option value='w'>여</Option>
							</Select>
						</Form.Item>
						<Form.Item
							name='birthMonth'
							noStyle
							rules={[{ required: true, message: 'Please input the captcha you got!' }]}
						>
							<Select style={{ width: '33%' }}>
								<Option value='m'>남</Option>
								<Option value='w'>여</Option>
							</Select>
						</Form.Item>
						<Form.Item
							name='birthDay'
							noStyle
							rules={[{ required: true, message: 'Please input the captcha you got!' }]}
						>
							<Select style={{ width: '33%' }}>
								<Option value='m'>남</Option>
								<Option value='w'>여</Option>
							</Select>
						</Form.Item>
						</Form.Item>

					</Col>
				</Row>
				</Form.Item>
				<Form.Item
				name='agreement'
				valuePropName='checked'
				rules={[
					{ validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') }
				]}
				{...tailFormItemLayout}
				>
				<Checkbox>
					I have read the <a href=''>agreement</a>
				</Checkbox>
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
				<Button type='primary' htmlType='submit'>
					Register
				</Button>
				</Form.Item>
			</Form>
			</Col>
		</Row>
		</>
	)
}

UserAdd.getInitialProps = async (context: NextPageContext) => {
	userFetcher.setContext(context)
	const users: CommonUser[] = await userFetcher.getUsers()
	return { users }
}

export default UserAdd

