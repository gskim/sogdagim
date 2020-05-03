import { GetPostsDetailRepliesResponse, GetPostsResponse } from '@sogdagim/model/models/admin'
import { LayoutType, PageComponent } from '@src/@types'
import Reply from '@src/components/Reply'
import ReplyEditor from '@src/components/ReplyEditor'
import ReplyList from '@src/components/ReplyList'
import PostFetcher from '@src/fetchers/post'
import { Avatar, Button, Comment } from 'antd'
import { NextPageContext } from 'next'
import React, { useState } from 'react'
const postFetcher = new PostFetcher()
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Replies: PageComponent<GetPostsDetailRepliesResponse & { id: number }> = (props) => {

	const router = useRouter()
	const [value, setValue] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const [replies, setReplies] = useState(props.replies)

	const handleSubmit = async () => {
		if (!value) {
		  return
		}
		setSubmitting(true)
		const res = await postFetcher.addReply(props.id, { parentId: props.id, text: value  })
		setReplies([
			{
				id: res.data.id,
				user: {
					nickname: res.data.user.nickname,
					profilePhoto: res.data.user.profilePhoto || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
				},
				text: res.data.text,
				createdAt: res.data.createdAt,
				children: []
			},
			...replies
		])
		setSubmitting(false)
		setValue('')

	  }

	  const handleChange = (e) => {
		  setValue(e.target.value)
	  }

	return (
		<div>
			<Comment
			avatar={
				<Avatar
					src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
					alt='Han Solo'
				/>
			}
			content={
				<ReplyEditor
					onChange={handleChange}
					onSubmit={handleSubmit}
					submitting={submitting}
					value={value}
				/>
			}
			/>
		{replies.length > 0 && <ReplyList replies={replies} visibleHeader={true} />}
		</div>
	)
}

Replies.getInitialProps = async (context: NextPageContext) => {
	postFetcher.setContext(context)
	const res = await postFetcher.getReplies(Number(context.query.id))
	return {
		replies: res.replies,
		id: Number(context.query.id)
	}
}

Replies.layoutType = LayoutType.기본화면
Replies.isPublicPage = false

export default Replies

const AddButton = styled(Button)`
	margin-bottom: 10px
	`
