import { GetAdminPostsResponse } from '@sogdagim/model'
import { LayoutType, PageComponent } from '@src/@types'
import PostFetcher from '@src/fetchers/post'
import { Button, Col, Divider, Row, Table } from 'antd'
import { NextPageContext } from 'next'
import React from 'react'
const postFetcher = new PostFetcher()
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Posts: PageComponent<GetAdminPostsResponse> = ({ posts }) => {

	const columns = [
		{ title: 'Id', dataIndex: 'id', key: 'id', render: (id) => <Link href='posts/[id]' as={`posts/${id}`} ><a>{id}</a></Link> },
		{ title: 'Title', dataIndex: 'title', key: 'title' },
		{ title: 'Text', dataIndex: 'text', key: 'text' },
		{ title: 'Status', dataIndex: 'status', key: 'status' }
	]
	const router = useRouter()

	const addButtonClick = (e) => {
		router.push('/posts/add')
	}

	return (
		<>
		<Divider orientation='left' style={{ color: '#333', fontWeight: 'normal' }}>
				Post List
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
					dataSource={posts}
					columns={columns}
					rowKey='id'
				>
				</Table>
			</Col>
		</Row>
		</>
	)
}

Posts.getInitialProps = async (context: NextPageContext) => {
	console.log(context)
	postFetcher.setContext(context)
	const res = await postFetcher.getPosts()
	return res
}

Posts.layoutType = LayoutType.기본화면
Posts.isPublicPage = false

export default Posts

const AddButton = styled(Button)`
	margin-bottom: 10px
	`
