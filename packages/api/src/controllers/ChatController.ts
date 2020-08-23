import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, Post, Req, SerializeOptions,
	UseGuards, UseInterceptors } from '@nestjs/common'
import { ChatService } from '@services/ChatService'
import { plainToClass, GetChatsResponse } from '@sogdagim/model'
import { User } from '@sogdagim/orm'
import { CurrentUser, JwtAuthGuard } from '../CustomDecorator'

@Controller()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
export class ChatController {
	@Inject() private readonly chatService: ChatService

	@Get('/chats')
	async getAllChat() {
		const chats = await this.chatService.getOpenChats()
		return plainToClass(GetChatsResponse, { chats: chats })
	}
}
