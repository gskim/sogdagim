import { GetAdminChatsResponse } from '@sogdagim/model'
import { LayoutType, PageComponent } from '@src/@types'
import ChatFetcher from '@src/fetchers/chat'
import { Button, Col, Divider, Row, Table } from 'antd'
import { NextPageContext } from 'next'
import React from 'react'
const chatFetcher = new ChatFetcher()
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Chats: PageComponent<GetAdminChatsResponse> = ({ chats }) => {
	const columns = [
		{ title: 'Id', dataIndex: 'id', key: 'id', render: (id) => <Link href='chats/[id]' as={`chats/${id}`} ><a>{id}</a></Link> },
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
		{ title: 'Type', dataIndex: 'type', key: 'type' },
		{ title: 'Users', dataIndex: 'users', key: 'users', render: (users) => users.length },
		{ title: 'MaxPersons', dataIndex: 'maxPersons', key: 'maxPersons' }
	]
	const router = useRouter()

	const addButtonClick = (e) => {
		router.push('/chats/add')
	}

	return (
		<>
		<Divider orientation='left' style={{ color: '#333', fontWeight: 'normal' }}>
				Chat List
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
					dataSource={chats}
					columns={columns}
					rowKey='id'
				>
				</Table>
			</Col>
		</Row>
		</>
	)
}

Chats.getInitialProps = async (context: NextPageContext) => {
	chatFetcher.setContext(context)
	const res = await chatFetcher.getAllChats({})
	return res
}

Chats.layoutType = LayoutType.기본화면
Chats.isPublicPage = false

export default Chats

const AddButton = styled(Button)`
	margin-bottom: 10px
	`
