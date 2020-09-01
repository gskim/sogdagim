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
import { ChatRepository } from '@repositories/ChatRepository'
import { UserRepository } from '@repositories/UserRepository'
import { Chat, ChatType, User } from '@sogdagim/orm'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Server, Socket } from 'socket.io'
import { CurrentUser, JwtAuthGuard, WsGuard } from '../CustomDecorator'

  @WebSocketGateway()
  export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer()
	server: Server

	@InjectRepository(Chat) private readonly chatRepository: ChatRepository
	@InjectRepository(User) private readonly userRepository: UserRepository

	afterInit(server: Server) {
		console.log('afterinit')
		// console.log(server)
	}

	handleDisconnect(socket: Socket) {
		console.log('discon')
		// console.log(socket)
	}

	handleConnection(socket: Socket, ...args: any[]) {
		console.log('con')
		// console.log(socket)
	}

	@SubscribeMessage('entranceChat')
	async entranceChat(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		console.log('entranceChat', data)
		socket.join(data.chatId.toString(), async (err) => {
			if (err) console.error(err)
			return true
		})
	}

	@UseGuards(WsGuard)
	@SubscribeMessage('joinChat')
	async joinChat(@MessageBody() data: any, @ConnectedSocket() socket: Socket, @CurrentUser() currentUser: User) {
		console.log(data)
		console.log('---------------------')
		console.log(currentUser)
		socket.join(data.chatId.toString(), async (err) => {
			if (err) console.error(err)
			const chat = await this.chatRepository.findOne(data.chatId,
				{ relations: ['users'] })
			if (!chat) throw new NotFoundException('존재하지않는 채팅방 입니다')
			if (chat.users.length === chat.maxPersons) throw new NotFoundException('인원이 가득 찾습니다')
			if (chat.type === ChatType.PRIVATE) {
				if (!data.password) throw new BadRequestException('비밀번호를 입력해주세요')
				if (chat.password !== data.password) throw new BadRequestException('비밀번호가 일치하지 않습니다')
			}
			chat.users.push(currentUser)
			await this.chatRepository.save(chat)
		})
		return true
	}

	@UseGuards(WsGuard)
	@SubscribeMessage('sendMessage')
	sendMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		console.log(data)
		// socket.to(data.chatId.toString()).emit('sendMessage', { room: 'aRoom' })
		socket.to(data.chatId.toString()).emit('receiveMessage', data)
		return { event: 'sendSuccess', data: data }
		// return from([1, 2, 3]).pipe(map((item) => ({ event: 'cc', data: item })))
	}

	@SubscribeMessage('bb')
	async identity(@MessageBody() data: number): Promise<number> {
		console.log('bb')
		console.log(data)
		return data
	}

	@SubscribeMessage('cc')
	cc(@MessageBody() data: number): WsResponse {
		console.log('cc')
		console.log(data)
		return { event: 'cc', data: 'cc' }
	}
}
