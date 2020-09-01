import { QuestionCircleOutlined } from '@ant-design/icons'
import { Gender, GetPostsDetailResponse, PostStatus } from '@sogdagim/model/models'
import { LayoutType, PageComponent } from '@src/@types'
import PostFetcher from '@src/fetchers/post'
import { Button, Col, Divider, Form, Input, Row, Select, Table, Tooltip, Typography } from 'antd'
import moment from 'moment'
import { NextPageContext } from 'next'
import React from 'react'
import 'reflect-metadata'
import styled from 'styled-components'

const postFetcher = new PostFetcher()
const { Option } = Select

const PostEdit: PageComponent<GetPostsDetailResponse> = (props) => {
	const formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 12 }
	}
	const [form] = Form.useForm()

	const onFinish = async (values) => {
		const res = await postFetcher.modifyPost(props.data.id, values)
		const formData = {
			...res.data, createdAt: moment(res.data.createdAt).format('YYYY-MM-DD HH:mm:ss') , updatedAt: moment(res.data.updatedAt).format('YYYY-MM-DD HH:mm:ss')
		}
		form.setFieldsValue(formData)
	}
	return (
		<>
		<Divider orientation='left' style={{ color: '#333', fontWeight: 'normal' }}>
				Post Edit
		</Divider>
		<Row justify='center'>
			<Col span={20}>
			<Form
				{...formItemLayout}
				size='large'
				form={form}
				name='postEdit'
				onFinish={onFinish}
				initialValues={{
					...props.data, createdAt: moment(props.data.createdAt).format('YYYY-MM-DD HH:mm:ss') , updatedAt: moment(props.data.updatedAt).format('YYYY-MM-DD HH:mm:ss')
				}}
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

PostEdit.layoutType = LayoutType.기본화면
PostEdit.isPublicPage = false

PostEdit.getInitialProps = async (context: NextPageContext) => {
	postFetcher.setContext(context)
	const res = await postFetcher.getPost(Number(context.query.id))
	return { ...res }
}

export default PostEdit
