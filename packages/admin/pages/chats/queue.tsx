import { GetAdminChatsResponse } from '@sogdagim/model'
import { LayoutType, PageComponent } from '@src/@types'
import { MyInfoContext } from '@src/contexts/MyInfoContext'
import { SocketContext } from '@src/contexts/SocketContext'
import ChatFetcher from '@src/fetchers/chat'
import { Button, Col, Divider, Row, Table } from 'antd'
import cookie from 'js-cookie'
import { NextPageContext } from 'next'
import React, { useContext } from 'react'
import styled from 'styled-components'

const Queue: PageComponent = (props: any) => {
	const socket = useContext(SocketContext)
	const token = cookie.get('token')
	socket.emit('initRandomChat', { headers: { authorization: `Bearer ${token}` } })
	socket.emit('requestRandomChat', { headers: { authorization: `Bearer ${token}` } })

	socket.on('requestSuccess', (data) => {
		console.log('requestSuccess', data)
	})

	socket.on('matchFail', (data) => {
		console.log('matchFail', data)
	})

	socket.on('matchSuccess', (data) => {
		console.log('matchSuccess', data)
	})

	return (
		<>
		</>
	)
}

Queue.getInitialProps = async (context: NextPageContext) => {
	return {}
}

Queue.layoutType = LayoutType.기본화면
Queue.isPublicPage = false

export default Queue

const AddButton = styled(Button)`
	margin-bottom: 10px
	`
