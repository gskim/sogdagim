import { AdminCommonUser } from '@sogdagim/model'
import { LayoutType, PageComponent } from '@src/@types'
import UserFetcher from '@src/fetchers/user'
import { Button, Col, Divider, Row, Table, Typography } from 'antd'
import { NextPageContext } from 'next'
import React from 'react'
const userFetcher = new UserFetcher()
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Users: PageComponent<{users: AdminCommonUser[]}> = ({ users }) => {

	const columns = [
		{ title: 'Id', dataIndex: 'id', key: 'id', render: (id) => <Link href='users/[id]' as={`users/${id}`} ><a>{id}</a></Link> },
		{ title: 'Nickname', dataIndex: 'nickname', key: 'nickname' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{ title: 'Gender', dataIndex: 'gender', key: 'gender' },
		{ title: 'CreatedAt', dataIndex: 'createdAt', key: 'createdAt' },
		{ title: 'UpdatedAt', dataIndex: 'updatedAt', key: 'updatedAt' }
	]
	const router = useRouter()

	const addButtonClick = (e) => {
		router.push('/users/add')
	}

	return (
		<>
		<Divider orientation='left' style={{ color: '#333', fontWeight: 'normal' }}>
				User List
		</Divider>
		<Row justify='end'>
			<Col span={2}>
				<AddButton type='primary' onClick={addButtonClick} >
				등록
				</AddButton>
			</Col>
		</Row>
		<Row justify='center'>
			<Col span={24}>
				<Table
					dataSource={users}
					columns={columns}
					rowKey='id'
				>
				</Table>
			</Col>
		</Row>
		</>
	)
}

Users.getInitialProps = async (context: NextPageContext) => {
	userFetcher.setContext(context)
	const users: AdminCommonUser[] = await userFetcher.getUsers()
	return { users }
}

Users.layoutType = LayoutType.기본화면
Users.isPublicPage = false

export default Users

const AddButton = styled(Button)`
	margin-bottom: 10px
	`
