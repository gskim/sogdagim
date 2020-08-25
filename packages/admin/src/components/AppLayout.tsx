import {
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
	WechatOutlined
  } from '@ant-design/icons'
import { LayoutOptions, LayoutType } from '@src/@types'
import { Col, Layout, Menu, Row, Space } from 'antd'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import { useState, FC } from 'react'
const { Header, Content, Footer, Sider } = Layout

const AppLayout: FC<LayoutOptions> = ({ layoutType, path, children, logout, myInfo }) => {
	const router = useRouter()
	const defaultKey = () => {
		switch (true) {
			case /^\/users$/.test(router.pathname):
				return '1'
			case /^\/posts$/.test(router.pathname):
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
				router.push('/users')
				break
			case '2':
				router.push('/posts')
				break
			case '3':
				router.push('/chats')
				break
			default:
		}
	  }

	if (layoutType === LayoutType.전체화면) {
		return (
			<div>
				{children}
			</div>
		)
	}

	return (
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
					<span className='nav-text'>Users</span>
				</Menu.Item>
				<Menu.Item key='2'>
					<VideoCameraOutlined />
					<span className='nav-text'>Posts</span>
				</Menu.Item>
				<Menu.Item key='3'>
					<WechatOutlined />
					<span className='nav-text'>Chats</span>
				</Menu.Item>
				<Menu.Item key='4'>
					<UserOutlined />
					<span className='nav-text'>nav 4</span>
				</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Header className='site-layout-sub-header-background' style={{ padding: 0 }} >
					<Row>
						<Col span={8} offset={16}>
							<Space direction='horizontal'>
								<span>{myInfo?.nickname}</span>
								<span>{myInfo?.email}</span>
								<Button type='primary' onClick={logout}>Log Out</Button>
							</Space>

						</Col>
					</Row>
				</Header>
				<Content style={{ margin: '24px 16px 0' }} >
				<div className='site-layout-background' style={{ padding: 24, overflow: 'initial' }}>
					{children}
				</div>
				</Content>
				{/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
			</Layout>
		</Layout>
	)
}

export default AppLayout
