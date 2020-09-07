import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '@services/UserService'
import { SignUpType, User } from '@sogdagim/orm'

@Injectable()
export class AuthService {

	@Inject() private readonly userService: UserService
	@Inject() private readonly jwtService: JwtService

	async getUser(email: string) {
		try {
			return await this.userService.findByEmail(email)
		} catch (error) {
			throw new NotFoundException('Not Found User')
		}
	}

	getJWT(user: User) {
		const payload = { id: user.id, accessToken: user.accessToken }
		return this.jwtService.sign(payload)
	}

	async getSnsUser(email: string, oauthId: string, signUpType: SignUpType) {
		const user = await this.userService.findSnsUser(email, oauthId, signUpType)
		if (!user) return await this.userService.addSnsUser(email, oauthId, signUpType)
		return user
	}

}
