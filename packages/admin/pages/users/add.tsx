import { QuestionCircleOutlined } from '@ant-design/icons'
import { Gender } from '@sogdagim/model'
import { LayoutType, PageComponent } from '@src/@types'
import UserFetcher from '@src/fetchers/user'
import { Button, Checkbox, Col, Divider, Form, Input, Row, Select, Table, Tooltip, Typography } from 'antd'
import { NextPageContext } from 'next'
import React from 'react'
import styled from 'styled-components'

const userFetcher = new UserFetcher()
const { Option } = Select

const UserAdd: PageComponent = (props) => {
	const formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 12 }
	}
	const tailFormItemLayout = {
		wrapperCol: {
			span: 12,
			offset: 6
		}
	}
	const [form] = Form.useForm()
	const onFinish = async (values) => {
		await userFetcher.addUser(values)
	  }
	return (
		<>
		<Divider orientation='left' style={{ color: '#333', fontWeight: 'normal' }}>
				User Add
		</Divider>
		<Row justify='center'>
			<Col span={20}>
			<Form
				{...formItemLayout}
				size='large'
				form={form}
				name='userAdd'
				onFinish={onFinish}
				initialValues={{}}
				scrollToFirstError
			>
				<Form.Item
				name='email'
				label='E-mail'
				rules={[
					{
					type: 'email',
					message: '이메일 형식이 아닙니다.'
					},
					{
					required: true,
					message: '이메일 입력은 필수입니다.'
					}
				]}
				hasFeedback
				>
				<Input />
				</Form.Item>

				<Form.Item
				name='nickname'
				label={
					<span>
					Nickname&nbsp;
					<Tooltip title='닉네임을 입력해주세요'>
						<QuestionCircleOutlined />
					</Tooltip>
					</span>
				}
				rules={[{ required: true, message: '닉네임 입력은 필수입니다.' }]}
				>
				<Input />
				</Form.Item>
				<Form.Item
					label='성별'
					name='gender'
					rules={[{ required: true, message: '성별 입력을 필수입니다.' }]}
				>
					<Select style={{ width: '100%' }}>
						<Option value={Gender.Man}>남</Option>
						<Option value={Gender.Woman}>여</Option>
					</Select>
				</Form.Item>
				<Form.Item
					label='생년월일'
					required={true}
				>
					<Input.Group>
						<Row gutter={8}>
							<Col span={5}>
							<Form.Item
						name='birthYear'
						rules={[{ required: true, message: '생년을 입력해주세요.' },
						{ len: 4, message: '4자리로 입력해주세요.' },
						{ pattern: new RegExp(/^[0-9]*$/), message: '숫자가 아닙니다.' }
						]}
					>
						<Input />
					</Form.Item>
							</Col>
							<Col span={5}>
							<Form.Item
						name='birthMonth'
						rules={[{ required: true, message: '생월을 입력해주세요.' },
						{ len: 2, message: '2자리로 입력해주세요.' },
						{ pattern: new RegExp(/^[0-9]*$/), message: '숫자가 아닙니다.' }
						]}
					>
						<Input />
					</Form.Item>
							</Col>
							<Col span={5}>
							<Form.Item
						name='birthDay'
						rules={[{ required: true, message: '생일을 입력해주세요' },
						{ len: 2, message: '2자리로 입력해주세요.' },
						{ pattern: new RegExp(/^[0-9]*$/), message: '숫자가 아닙니다.' }
						]}
					>
						<Input />
					</Form.Item>
							</Col>
						</Row>
					</Input.Group>
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
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

UserAdd.layoutType = LayoutType.기본화면
UserAdd.isPublicPage = false

UserAdd.getInitialProps = async (context: NextPageContext) => {
	userFetcher.setContext(context)
	return {}
}

export default UserAdd
