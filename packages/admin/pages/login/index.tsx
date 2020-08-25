import { LayoutType } from '@src/@types'
import { SocketContext } from '@src/contexts/SocketContext'
import AuthFetcher, { LoginParams } from '@src/fetchers/auth'
import { Button, Form, Input } from 'antd'
import { useContext } from 'react'
import styled from 'styled-components'

const authFetcher = new AuthFetcher()

const Login = (props) => {

	// const socket = useContext(SocketContext)

	// socket.on('sendMessage', (data) => {
	// 	console.log('sendMessage')
	// 	console.log(data)
	// })

	// socket.on('receiveMessage', (data) => {
	// 	console.log('receiveMessage')
	// 	console.log(data)
	// })

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
	const onFinish = async (values: LoginParams) => {
		await authFetcher.login(values)
	}

	return (
		<LoginWrap>
			<LoginLogo width='240' height='60' alt='로고 이미지'/>
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
				<Form.Item {...tailFormItemLayout}>
				<Button type='primary' htmlType='submit'>
					Login
				</Button>
				</Form.Item>
			</Form>
		</LoginWrap>
	)
}
export default Login

Login.getInitialProps = async (ctx) => {
	if (authFetcher.isAuth(ctx)) {
		ctx.res.writeHead(302, { Location: '/' })
		ctx.res.end()
	}

	return {}
}

Login.layoutType = LayoutType.전체화면
Login.isPublicPage = true

const LoginWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding: 60px 10px;
`

const LoginLogo = styled.img`
	align-self: center;
	margin-bottom: 35px;
`

const LoginButtonGroup = styled.div`
	display: flex;
	flex-direction: column;
`

const ButtonWrap = styled.div`
	padding: 10px 0;
`
