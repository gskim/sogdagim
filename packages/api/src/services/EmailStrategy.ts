import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@sogdagim/orm'
import Crypto from '@utils/Crypto'
import { Strategy } from 'passport-local'
import { AuthService } from './AuthService'

@Injectable()
export class EmailStrategy extends PassportStrategy(Strategy, 'email') {

	constructor(private readonly authService: AuthService) {
		super({ usernameField: 'email',passwordField: 'password' })
  	}

  async validate(email: string, password: string): Promise<User> {
	const user = await this.authService.getUser(email)
	// if (Crypto.SHA256(password) !== user.password) throw new BadRequestException('잘못된 비밀번호입니다.')
	return user
  }
}
