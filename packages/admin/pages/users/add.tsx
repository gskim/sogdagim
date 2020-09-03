import { QuestionCircleOutlined } from '@ant-design/icons'
import { Gender } from '@sogdagim/model'
import { LayoutType, PageComponent } from '@src/@types'
import UserFetcher from '@src/fetchers/user'
import { Button, Checkbox, Col, Divider, Form, Input, Row, Select, Table, Tooltip, Typography } from 'antd'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

const userFetcher = new UserFetcher()
const { Option } = Select

const UserAdd: PageComponent = (props) => {
	const router = useRouter()
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
		const { id } = await userFetcher.addUser(values)
		router.push(`/users/${id}`)
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
