import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, Post, Put, SerializeOptions,
	UseGuards, UseInterceptors } from '@nestjs/common'
import { ChatService } from '@services/ChatService'
import { UserService } from '@services/UserService'
import { plainToClass } from '@sogdagim/model'
import { GetUsersDetailResponse, GetUsersResponse, PostUsersRequest, PostUsersResponse, PutUsersDetailRequest,
	PutUsersDetailResponse } from '@sogdagim/model/models'
import { GetUsersChatsResponse, User } from '@sogdagim/orm'
import { CurrentUser, JwtAuthGuard } from '../CustomDecorator'

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
export class UserController {

	@Inject() private readonly userService: UserService
	@Inject() private readonly chatService: ChatService

	@Get('/users')
	async users(): Promise<GetUsersResponse> {
		const users = await this.userService.getUsers()
		return plainToClass(GetUsersResponse, { users: users })
	}

	@Get('/users/:id(\\d+)')
	async user(@Param('id') id: number): Promise<GetUsersDetailResponse> {
		const user = await this.userService.getUser(id)
		return plainToClass(GetUsersDetailResponse, { data: user })
	}

	@Put('/users/:id(\\d+)')
	async modifyUser(@Param('id') id: number, @Body() params: PutUsersDetailRequest): Promise<PutUsersDetailResponse> {
		const user = await this.userService.modifyUser(id, params.nickname, params.gender, params.birthYear, params.birthMonth, params.birthDay)
		return plainToClass(PutUsersDetailResponse, { data: user })
	}

	@Post('/users')
	async addUser(@Body() params: PostUsersRequest): Promise<PostUsersResponse> {
		const addedUser = await this.userService.addUser(params.email, params.nickname, params.birthYear, params.birthMonth, params.birthDay, params.gender)
		return {
			id: addedUser.id
		}
	}

	@Get('/users/chats')
	@UseGuards(JwtAuthGuard)
	async myChats(@CurrentUser() currentUser: User) {
		const chats = await this.chatService.getMyChats(currentUser)
		return plainToClass(GetUsersChatsResponse, { chats: chats })
	}
}
