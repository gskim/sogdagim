import { BadRequestException, NotFoundException, UseGuards } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse
  } from '@nestjs/websockets'
import { ChatQueueRepository } from '@repositories/ChatQueueRepository'
import { ChatRepository } from '@repositories/ChatRepository'
import { MessageRepository } from '@repositories/MessageRepository'
import { UserRepository } from '@repositories/UserRepository'
import { plainToClass, Chat, ChatQueue, ChatQueueType, ChatType, Message, User } from '@sogdagim/orm'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Server, Socket } from 'socket.io'
import { Transactional } from 'typeorm-transactional-cls-hooked'
import { CurrentUser, WsGuard } from '../CustomDecorator'

  @WebSocketGateway()
  export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer()
	server: Server

	@InjectRepository(Chat) private readonly chatRepository: ChatRepository
	@InjectRepository(ChatQueue) private readonly chatQueueRepository: ChatQueueRepository
	@InjectRepository(User) private readonly userRepository: UserRepository
	@InjectRepository(Message) private readonly messageRepository: MessageRepository

	afterInit(server: Server) {
		console.log('afterinit')
		console.log(server.sockets.sockets)
		// console.log(server)
	}

	async handleDisconnect(socket: Socket) {
		console.log('discon')

		// console.log(socket)
	}

	async handleConnection(socket: Socket, ...args: any[]) {
		console.log('con')
		console.log(args)
		socket.to(socket.id).emit('connectSuccess', {})
		// console.log(socket)
	}

	@SubscribeMessage('initRandomChat')
	@UseGuards(WsGuard)
	async initRandomChat(@CurrentUser() currentUser: User) {
		await this.chatQueueRepository.createQueryBuilder()
		.update().andWhere(`userId = :userId`, { userId: currentUser.id })
		.execute()
	}

	@SubscribeMessage('requestRandomChat')
	@UseGuards(WsGuard)
	@Transactional()
	async requestRandomChat(@MessageBody() data: any, @ConnectedSocket() socket: Socket, @CurrentUser() currentUser: User) {
		console.log('requestRandomChat')
		console.log(currentUser)
		const queue = await this.chatQueueRepository.findQueue()
		if (queue) {
			if (queue.userId === currentUser.id) {
				// fail
				console.log('fail1')
				this.matchFail(socket)
			} else {
				const partnerUser = await this.userRepository.findOne(queue.userId)
				if (!partnerUser) {
					// fail
					console.log('fail2')
					// out update
					queue.type = ChatQueueType.OUT
					await this.chatQueueRepository.save(queue)
					this.matchFail(socket)
				} else {
					console.log('success')
					queue.type = ChatQueueType.MATCH
					await this.chatQueueRepository.save(queue)
					const chat = await this.chatRepository.addChat([currentUser, partnerUser], ChatType.RANDOM, 2, undefined, undefined, undefined)
					const partnerSocket = this.server.sockets.sockets[queue.socketId]
					if (!partnerSocket) {
						// fail
						// out update?
						queue.type = ChatQueueType.OUT
						await this.chatQueueRepository.save(queue)
						this.matchFail(socket)
					} else {
						socket.join(chat.id.toString())
						partnerSocket.join(chat.id.toString())
						this.server.to(socket.id).emit('matchSuccess', { chatId: chat.id, partner: { nickname: partnerUser.nickname } })
						this.server.to(partnerSocket.id).emit('matchSuccess', { chatId: chat.id, partner: { nickname: currentUser.nickname } })
					}
				}
			}
		} else {
			// fail
			console.log('fail3')
			// 대기열에 아무도없음
			await this.chatQueueRepository.addQueue(currentUser.id, socket.id)
			this.matchFail(socket)
		}
		return { event: 'requestSuccess', data: {} }
	}

	@SubscribeMessage('entranceChat')
	entranceChat(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		console.log('entranceChat', data)
		socket.join(data.chatId.toString(), (err) => {
			if (err) throw new BadRequestException('failed join')
		})
		return { event: 'entranceChatSuccess', data: {} }
	}

	@UseGuards(WsGuard)
	@SubscribeMessage('sendMessage')
	async sendMessage(@MessageBody() data: { message: string, chatId: number, isImage: boolean },
	@ConnectedSocket() socket: Socket,
	@CurrentUser() currentUser: User) {
		console.log(data)
		const message = this.messageRepository.create()
		const chat = await this.chatRepository.findOne(data.chatId)
		if (!chat) throw new BadRequestException('not found chat')
		message.chat = chat
		message.user = currentUser
		message.text = data.message
		await this.messageRepository.save(message)
		socket.to(data.chatId.toString()).emit('receiveMessage',
		{ ...data, user: { id: currentUser.id, nickname: currentUser.nickname, profilePhoto: currentUser.profilePhoto } })
		return { event: 'sendSuccess', data: data }
		// return from([1, 2, 3]).pipe(map((item) => ({ event: 'cc', data: item })))
	}

	@UseGuards(WsGuard)
	@SubscribeMessage('sendInviteChat')
	sendInviteChat(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		console.log(data)
		socket.to(data.chatId.toString()).emit('receiveInviteChat', {})
		return { event: 'sendInviteChatSuccess', data: data }
	}

	@UseGuards(WsGuard)
	@SubscribeMessage('approveInviteChat')
	async approveInviteChat(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		console.log(data)
		const chat = await this.chatRepository.findOne(data.chatId)
		if (!chat) throw new NotFoundException('not found chat')
		chat.type = ChatType.FRIEND
		await this.chatRepository.save(chat)
		socket.to(data.chatId.toString()).emit('receiveApproveInviteChat', {})
		return { event: 'approveInviteChatSuccess', data: data }
	}

	private matchFail(socket: Socket) {
		this.server.to(socket.id).emit('matchFail', {})
	}
}
