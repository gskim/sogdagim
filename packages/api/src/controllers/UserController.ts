import { ClassSerializerInterceptor, Controller, Get, Inject, SerializeOptions, UseInterceptors } from '@nestjs/common'
import { UserService } from '@services/UserService'
import { plainToClass } from '@sogdagim/model'
import { CommonUser, GetUsersResponse } from '@sogdagim/model/models/app'

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
}
