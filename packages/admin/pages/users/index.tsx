import { CommonUser } from '@sogdagim/model/models/app'
import { PageComponent } from '@src/@types'
import UserFetcher from '@src/fetchers/user'
import { Button, Col, Divider, Row, Table, Typography } from 'antd'
import { NextPageContext } from 'next'
import React from 'react'
const userFetcher = new UserFetcher()
import styled from 'styled-components'

const Users: PageComponent<{users: CommonUser[]}> = ({ users }) => {
	const columns = [
		{ title: 'Nickname', dataIndex: 'nickname', key: 'nickname' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{ title: 'Gender', dataIndex: 'gender', key: 'gender' },
		{ title: 'BirthYear', dataIndex: 'birthYear', key: 'birthYear' },
		{ title: 'BirthMonth', dataIndex: 'birthMonth', key: 'birthMonth' },
		{ title: 'BirthDay', dataIndex: 'birthDay', key: 'birthDay' }
	]
	return (
		<>
		<Divider orientation='left' style={{ color: '#333', fontWeight: 'normal' }}>
				User List
		</Divider>
		<Row justify='end'>
			<Col span={2}>
			<AddButton type='primary' >
				등록
				</AddButton>
			</Col>
		</Row>
		<Row justify='center'>
			<Col span={24}>
				<Table
					dataSource={users}
					columns={columns}
				>
				</Table>
			</Col>
		</Row>
		</>
	)
}

Users.getInitialProps = async (context: NextPageContext) => {
	userFetcher.setContext(context)
	const users: CommonUser[] = await userFetcher.getUsers()
	return { users }
}

export default Users

const AddButton = styled(Button)`
	margin-bottom: 10px
	`
