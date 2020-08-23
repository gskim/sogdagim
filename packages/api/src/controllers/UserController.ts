import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, Post, Put, SerializeOptions, UseInterceptors } from '@nestjs/common'
import { UserService } from '@services/UserService'
import { plainToClass } from '@sogdagim/model'
import { GetUsersDetailResponse, GetUsersResponse, PostUsersRequest, PostUsersResponse, PutUsersDetailRequest,
	PutUsersDetailResponse } from '@sogdagim/model/models'

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
export class UserController {

	@Inject()
	private readonly userService: UserService

	@Get('/users')
	async users(): Promise<GetUsersResponse> {
		const users = await this.userService.getUsers()
		return plainToClass(GetUsersResponse, { users: users })
	}

	@Get('/users/:id')
	async user(@Param('id') id: number): Promise<GetUsersDetailResponse> {
		const user = await this.userService.getUser(id)
		return plainToClass(GetUsersDetailResponse, { data: user })
	}

	@Put('/users/:id')
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
	async myChats() {

	}
}
