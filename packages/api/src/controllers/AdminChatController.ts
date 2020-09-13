import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, Post, Put, Query, Req, SerializeOptions,
	UseGuards, UseInterceptors } from '@nestjs/common'
import { ChatService } from '@services/ChatService'
import { UserService } from '@services/UserService'
import { plainToClass, GetAdminChatsDetailResponse, GetAdminChatsRequest, GetAdminChatsResponse, PostAdminChatsRequest,
	PostAdminChatsResponse, PostAdminChatsUserRequest, PostAdminChatsUserResponse
} from '@sogdagim/model'
import { GetAdminChatsMessagesRequest, GetAdminChatsMessagesResponse, User } from '@sogdagim/orm'
import { CurrentUser, JwtAuthGuard } from '../CustomDecorator'

@Controller('/admin')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
export class AdminChatController {
	@Inject() private readonly chatService: ChatService
	@Inject() private readonly userService: UserService

	@Get('/chats')
	async getAllChats(@Query() query: GetAdminChatsRequest) {
		const chats = await this.chatService.getOpenChats(query.lastId)
		return plainToClass(GetAdminChatsResponse, { chats: chats })
	}

	@Post('/chats')
	async createChat(@Body() body: PostAdminChatsRequest, @CurrentUser() currentUser: User) {
		let createUser = currentUser
		if (body.createUserId) {
			createUser = await this.userService.getUser(body.createUserId)
		}
		const chat = await this.chatService.createChat(body.name, body.description, createUser, body.type, body.maxPersons, body.password)
		return plainToClass(PostAdminChatsResponse, { data: chat })
	}

	@Post('/chats/:id(\\d+)/users')
	async entranceChat(@Param('id') id: number, @CurrentUser() currentUser: User, @Body() body: PostAdminChatsUserRequest) {
		const result = await this.chatService.addUser(body.userId, id)
		return {
			users: plainToClass(PostAdminChatsUserResponse, result)
		}
	}

	@Get('/chats/:id(\\d+)')
	async getChat(@Param('id') id: number, @CurrentUser() currentUser: User) {
		const chat = await this.chatService.getChatInfo(id)
		return plainToClass(GetAdminChatsDetailResponse, { data: chat })
	}

	@Get('/chats/:id(\\d+)/messages')
	async getMessages(@Param('id') id: number, @Query() query: GetAdminChatsMessagesRequest) {
		const messages = await this.chatService.getMessages(id, query.lastId)
		return plainToClass(GetAdminChatsMessagesResponse, { messages: messages })
	}
}
