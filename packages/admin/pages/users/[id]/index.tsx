import { QuestionCircleOutlined } from '@ant-design/icons'
import { Gender, GetAdminUsersDetailResponse } from '@sogdagim/model'
import { LayoutType, PageComponent } from '@src/@types'
import UserFetcher from '@src/fetchers/user'
import { Button, Col, Divider, Form, Input, Row, Select, Table, Tooltip, Typography } from 'antd'
import moment from 'moment'
import { NextPageContext } from 'next'
import React from 'react'
import 'reflect-metadata'
import styled from 'styled-components'

const userFetcher = new UserFetcher()
const { Option } = Select

const UserEdit: PageComponent<GetAdminUsersDetailResponse> = (props) => {

	const formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 12 }
	}
	const [form] = Form.useForm()

	const onFinish = async (values) => {
		const res = await userFetcher.modifyUser(props.data.id, values)
		const formData = {
			...res.data, createdAt: moment(res.data.createdAt).format('YYYY-MM-DD HH:mm:ss') , updatedAt: moment(res.data.updatedAt).format('YYYY-MM-DD HH:mm:ss')
		}
		form.setFieldsValue(formData)
	}
	return (
		<>
		<Divider orientation='left' style={{ color: '#333', fontWeight: 'normal' }}>
				User Edit
		</Divider>
		<Row justify='center'>
			<Col span={20}>
			<Form
				{...formItemLayout}
				size='large'
				form={form}
				name='userEdit'
				onFinish={onFinish}
				initialValues={{
					...props.data, createdAt: moment(props.data.createdAt).format('YYYY-MM-DD HH:mm:ss') , updatedAt: moment(props.data.updatedAt).format('YYYY-MM-DD HH:mm:ss')
				}}
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
				<Form.Item label='생년월일' required={true} style={{ marginBottom: 0 }}>
					<BirthYearInput
						name='birthYear'
						rules={[{ required: true, message: '생년을 입력해주세요.' },
						{ len: 4, message: '4자리로 입력해주세요.' },
						{ pattern: new RegExp(/^[0-9]*$/), message: '숫자가 아닙니다.' }
						]}
					>
						<Input placeholder='Input birth year' />
					</BirthYearInput>
					<BirthMonthInput
						name='birthMonth'
						rules={[{ required: true, message: '생월을 입력해주세요.' },
						{ len: 2, message: '2자리로 입력해주세요.' },
						{ pattern: new RegExp(/^[0-9]*$/), message: '숫자가 아닙니다.' }
						]}
					>
						<Input placeholder='Input birth month' />
					</BirthMonthInput>
					<BirthDayInput
						name='birthDay'
						rules={[{ required: true, message: '생일을 입력해주세요' },
						{ len: 2, message: '2자리로 입력해주세요.' },
						{ pattern: new RegExp(/^[0-9]*$/), message: '숫자가 아닙니다.' }
						]}
					>
						<Input placeholder='Input birth day' />
					</BirthDayInput>
				</Form.Item>
				<Form.Item
					label='등록일'
					name='createdAt'
				>
					<Input disabled />
				</Form.Item>
				<Form.Item
					label='수정일'
					name='updatedAt'
				>
					<Input disabled />
				</Form.Item>
				<Form.Item label=' ' colon={false}>
					<Button type='primary' htmlType='submit'>
						수정
					</Button>
				</Form.Item>
			</Form>
			</Col>
		</Row>
		</>
	)
}

UserEdit.layoutType = LayoutType.기본화면
UserEdit.isPublicPage = false

UserEdit.getInitialProps = async (context: NextPageContext) => {
	userFetcher.setContext(context)
	const res = await userFetcher.getUser(Number(context.query.id))
	return { ...res }
}

export default UserEdit

const BirthYearInput = styled(Form.Item)`
	display: inline-block;
	width: calc(31% - 4px);
`

const BirthMonthInput = styled(Form.Item)`
	display: inline-block;
	width: calc(31% - 4px);
	margin: 0 8px;
`

const BirthDayInput = styled(Form.Item)`
	display: inline-block;
	width: calc(31% - 4px);
`
