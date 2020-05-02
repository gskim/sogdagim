import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from '@services/AuthService'
import { UserService } from '@services/UserService'
import { User } from '@sogdagim/orm'
import { CurrentUser, EmailAuthGuard, JwtAuthGuard } from '../CustomDecorator'
@Controller()
export class AuthController {
	@Inject() private readonly authService: AuthService
	@Inject() private readonly userService: UserService

	@UseGuards(EmailAuthGuard)
	@Post('/auths/login')
	async postAuthsLogin(@CurrentUser() currentUser: User) {
		const user = await this.userService.updateLoginDateAndToken(currentUser)
		return {
			accessToken: this.authService.getJWT(user)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post('/auths/logout')
	async postAuthsLogout(@CurrentUser() currentUser: User) {
		await this.userService.updateLogoutDateAndToken(currentUser)
		return {
			success: true
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get('/auths/me')
	getAuthsProfile(@CurrentUser() currentUser: User) {
		return {
			id: currentUser.id,
			email: currentUser.email,
			nickname: currentUser.nickname
		}
	}
}
