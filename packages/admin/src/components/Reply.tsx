import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons'
import { AdminReplyItem } from '@sogdagim/model/models'
import ReplyList from '@src/components/ReplyList'
import { Avatar, Button, Comment, Input, Space, Tooltip } from 'antd'
import moment from 'moment'
import React, { createElement, useState, FC } from 'react'
import styled from 'styled-components'

const Reply: FC<AdminReplyItem> = ({ user, text, id, createdAt, children }) => {
	const [likes, setLikes] = useState(0)
	const [dislikes, setDislikes] = useState(0)
	const [action, setAction] = useState<string | null>(null)
	const [rereplies, setRereplies] = useState<AdminReplyItem[]>(children || [])
	const [rereplyValue, setRereplyValue] = useState<string>('')

	const like = () => {
		setLikes(1)
		setDislikes(0)
		setAction('liked')
	}

	const dislike = () => {
		setLikes(0)
		setDislikes(1)
		setAction('disliked')
	}

	const clickRereply = () => {
		if (!rereplyValue || rereplyValue === '') return false
		return true
	}

	const inputChange = (e) => {
		setRereplyValue(e.target.value)
	}

	const actions = [
		<span key='comment-basic-like'>
			<Tooltip title='Like'>
			{createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
				onClick: like
			})}
			</Tooltip>
			<ReplyAction>{likes}</ReplyAction>
		</span>,
		<span key=' key="comment-basic-dislike"'>
			<Tooltip title='Dislike'>
			{React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined, {
				onClick: dislike
			})}
			</Tooltip>
			<ReplyAction>{dislikes}</ReplyAction>
		</span>,
		children ? <Space><span key='comment-basic-reply-to' onClick={clickRereply} >Reply to</span><Input onChange={inputChange} /><Button type='primary' onClick={clickRereply} /></Space>
		: <></>
	]

	return (

	<Comment
		actions={actions}
		author={<a>{user.nickname}</a>}
		avatar={
			<Avatar
			src={user.profilePhoto || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
			alt={user.nickname}
			/>
		}
		content={
			<p>
			{text}
			</p>
		}
		datetime={
			<Tooltip title={moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}>
				<span>{moment(createdAt).fromNow()}</span>
			</Tooltip>
		}
	>
		{rereplies.length > 0 && <ReplyList replies={rereplies} visibleHeader={false} />}
	</Comment>
	)
}

export default Reply

const ReplyAction = styled.span`
	padding-left: 8px;
	cursor: auto;
`
