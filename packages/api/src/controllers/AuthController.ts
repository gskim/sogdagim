import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from '@services/AuthService'
import { UserService } from '@services/UserService'
import { PostAuthsSignupRequest } from '@sogdagim/model'
import { User } from '@sogdagim/orm'
import { Response } from 'express'
import { AppleAuthGuard, CurrentUser, EmailAuthGuard, GoogleAuthGuard, JwtAuthGuard } from '../CustomDecorator'
@Controller()
export class AuthController {
	@Inject() private readonly authService: AuthService
	@Inject() private readonly userService: UserService

	@Post('/auths/signup')
	async postAuthsSignup(@Body() params: PostAuthsSignupRequest) {
		const user = await this.userService.signUpByEmail(params.email, params.password)
		return { success: true }
	}

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

	@UseGuards(GoogleAuthGuard)
	@Get('/auths/google')
	async getGoogleLogin(@CurrentUser() currentUser: User) {
		const user = await this.userService.updateLoginDateAndToken(currentUser)
		return {
			accessToken: this.authService.getJWT(user)
		}
	}

	@UseGuards(AppleAuthGuard)
	@Post('/auths/apple')
	async postAppleLogin(@CurrentUser() currentUser: User) {
		const user = await this.userService.updateLoginDateAndToken(currentUser)
		const accessToken = this.authService.getJWT(user)
		return {
			accessToken: accessToken
		}
	}

	@UseGuards(AppleAuthGuard)
	@Get('/auths/apple')
	async getAppleLogin(@CurrentUser() currentUser: User) {
		const user = await this.userService.updateLoginDateAndToken(currentUser)
		const accessToken = this.authService.getJWT(user)
		return {
			accessToken: accessToken
		}
	}
}
