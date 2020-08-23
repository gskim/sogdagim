import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, Post, Put, Req, SerializeOptions,
	UseGuards, UseInterceptors } from '@nestjs/common'
import { ChatService } from '@services/ChatService'
import { plainToClass, GetChatsResponse, PostChatsRequest, PostChatsResponse } from '@sogdagim/model'
import { User } from '@sogdagim/orm'
import { CurrentUser, JwtAuthGuard } from '../CustomDecorator'

@Controller()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
export class ChatController {
	@Inject() private readonly chatService: ChatService

	@Get('/chats')
	async getAllChats() {
		const chats = await this.chatService.getOpenChats()
		return plainToClass(GetChatsResponse, { chats: chats })
	}

	@Post('/chats')
	async createChat(@Body() body: PostChatsRequest, @CurrentUser() currentUser: User) {
		const chat = await this.chatService.createChat(body.name, body.description, currentUser, body.type, body.maxPersons, body.password)
		return plainToClass(PostChatsResponse, { data: chat })
	}

}
