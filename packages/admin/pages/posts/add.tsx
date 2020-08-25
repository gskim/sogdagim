import { QuestionCircleOutlined } from '@ant-design/icons'
import { LayoutType, PageComponent } from '@src/@types'
import PostFetcher from '@src/fetchers/post'
import { Button, Col, Divider, Form, Input, Row, Select, Table, Tooltip, Typography } from 'antd'

import { PostStatus } from '@sogdagim/model'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

const postFetcher = new PostFetcher()
const { Option } = Select

const PostAdd: PageComponent = (props) => {
	const router = useRouter()
	const formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 12 }
	}

	const [form] = Form.useForm()
	const onFinish = async (values) => {
		const { id } = await postFetcher.addPost(values)
		router.push(`/posts/${id}`)
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
				name='postAdd'
				onFinish={onFinish}
				initialValues={{}}
				scrollToFirstError
			>
				<Form.Item
				name='title'
				label='제목'
				rules={[
					{
					required: true,
					message: '제목 입력은 필수입니다.'
					}
				]}
				hasFeedback
				>
				<Input />
				</Form.Item>

				<Form.Item
				name='text'
				label={
					<span>
					내용&nbsp;
					<Tooltip title='내용을 입력해주세요'>
						<QuestionCircleOutlined />
					</Tooltip>
					</span>
				}
				rules={[{ required: true, message: '내용 입력은 필수입니다.' }]}
				>
				<Input.TextArea autoSize />
				</Form.Item>
				<Form.Item
					label='공개상태'
					name='status'
					rules={[{ required: true, message: '공개상태 입력을 필수입니다.' }]}
				>
					<Select style={{ width: '100%' }}>
						<Option value={PostStatus.PUBLIC}>전체공개</Option>
						<Option value={PostStatus.PRIVATE}>비공개</Option>
						<Option value={PostStatus.DELETE}>삭제</Option>
					</Select>
				</Form.Item>
				<Form.Item colon={false} label=' '>
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

PostAdd.layoutType = LayoutType.기본화면
PostAdd.isPublicPage = false

PostAdd.getInitialProps = async (context: NextPageContext) => {
	postFetcher.setContext(context)
	return {}
}

export default PostAdd
