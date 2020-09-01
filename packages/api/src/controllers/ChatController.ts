import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, Post, Put, Query, Req, SerializeOptions,
	UseGuards, UseInterceptors } from '@nestjs/common'
import { ChatService } from '@services/ChatService'
import { plainToClass, GetChatsRequest, GetChatsResponse, PostChatsRequest, PostChatsResponse } from '@sogdagim/model'
import { GetChatsDetailResponse, GetChatsMessagesRequest, GetChatsMessagesResponse, PutChatsEntranceRequest, User } from '@sogdagim/orm'
import { CurrentUser, JwtAuthGuard } from '../CustomDecorator'

@Controller()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
export class ChatController {
	@Inject() private readonly chatService: ChatService

	@Get('/chats')
	async getAllChats(@Query() query: GetChatsRequest) {
		const chats = await this.chatService.getOpenChats(query.lastId)
		return plainToClass(GetChatsResponse, { chats: chats })
	}

	@Post('/chats')
	async createChat(@Body() body: PostChatsRequest, @CurrentUser() currentUser: User) {
		const chat = await this.chatService.createChat(body.name, body.description, currentUser, body.type, body.maxPersons, body.password)
		return plainToClass(PostChatsResponse, { data: chat })
	}

	@Put('/chats/:id(\\d+)/entrance')
	async entranceChat(@Param('id') id: number, @CurrentUser() currentUser: User, @Body() body: PutChatsEntranceRequest) {
		const result = await this.chatService.entranceChat(id, currentUser, body.password)
		return {
			data: { success: result }
		}
	}

	@Put('/chats/:id(\\d+)/exit')
	async exitChat(@Param('id') id: number, @CurrentUser() currentUser: User) {
		const result = await this.chatService.exitChat(id, currentUser)
		return {
			data: { success: result }
		}
	}

	@Get('/chats/:id(\\d+)')
	async getChat(@Param('id') id: number, @CurrentUser() currentUser: User) {
		const chat = await this.chatService.getChatInfo(id)
		return plainToClass(GetChatsDetailResponse, { data: chat })
	}

	@Get('/chats/:id(\\d+)/messages')
	async getMessages(@Param('id') id: number, @CurrentUser() currentUser: User, @Query() query: GetChatsMessagesRequest) {
		const messages = await this.chatService.getMessages(id, query.lastId)
		return plainToClass(GetChatsMessagesResponse, { messages: messages })
	}

}
