import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import GlobalStyle from '@src/assets/GlobalStyle'
import { Layout, Menu } from 'antd'
import { AppContext, AppProps } from 'next/app'
import NextHead from 'next/head'
import React, { useState } from 'react'
const { Header, Content, Footer, Sider } = Layout
import { useRouter } from 'next/router'

function MyApp({ Component , pageProps }: AppProps) {

	const router = useRouter()
	const defaultKey = () => {
		switch (router.pathname) {
			case '/':
				return '1'
			case '/users':
				return '2'
			default:
				return '1'
		}
	}

	const [currentKey, setCurrentKey] = useState<string>(defaultKey)

	const handleClick = (e) => {
		setCurrentKey(e.key)
		switch (e.key) {
			case '1':
				// 히스토리 안남음 (뒤로가기하면 이동전페이지로 못돌아옴)
				router.replace('/')
				break
			case '2':
				// 히스토리 남음 (뒤로가기하면 이동전페이지로 돌아옴)
				router.push('/users')
				break
			default:
		}
	  }

	return (

		<>
			<NextHead>
				<title>속닥임 어드민</title>
				<meta name='title' content='속닥임 어드민' />
				<meta name='description' content='속닥임 어드민' />
			</NextHead>
			<GlobalStyle />
			<Layout>
				<Sider
					breakpoint='lg'
					collapsedWidth='0'
					onBreakpoint={(broken) => {
					console.log(broken)
					}}
					onCollapse={(collapsed, type) => {
					console.log(collapsed, type)
					}}
				>
					<div className='logo' />
					<Menu theme='dark' mode='inline' selectedKeys={[currentKey]} onClick={handleClick} >
					<Menu.Item key='1'>
						<UserOutlined />
						<span className='nav-text'>nav 1</span>
					</Menu.Item>
					<Menu.Item key='2'>
						<VideoCameraOutlined />
						<span className='nav-text'>nav 2</span>
					</Menu.Item>
					<Menu.Item key='3'>
						<UploadOutlined />
						<span className='nav-text'>nav 3</span>
					</Menu.Item>
					<Menu.Item key='4'>
						<UserOutlined />
						<span className='nav-text'>nav 4</span>
					</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<Header className='site-layout-sub-header-background' style={{ padding: 0 }} />
					<Content style={{ margin: '24px 16px 0' }}>
					<div className='site-layout-background' style={{ padding: 24, height: '100%' }}>
						<Component {...pageProps} />
					</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
				</Layout>
			</Layout>
		</>
	)
}

MyApp.getInitialProps = async ({ Component, ctx, router }: AppContext) => {
	let pageProps = {}
	if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx)
	return { pageProps }
}

export default MyApp
