import {
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined
  } from '@ant-design/icons'
import { LayoutOptions, LayoutType } from '@src/@types'
import { Layout, Menu } from 'antd'
import { useRouter } from 'next/router'
import { useState, FC } from 'react'
const { Header, Content, Footer, Sider } = Layout

const AppLayout: FC<LayoutOptions> = ({ layoutType, path, children, logout }) => {
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
				// 히스토리 안남음 (뒤로가기하면 이동전페이지로 못돌아옴)
				router.push('/users')
				break
			case '2':
				// 히스토리 남음 (뒤로가기하면 이동전페이지로 돌아옴)
				router.push('/posts')
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
							{children}
						</div>
						</Content>
						<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
					</Layout>
				</Layout>
	)
}

export default AppLayout
