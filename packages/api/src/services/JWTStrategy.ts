import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '@repositories/UserRepository'
import { User } from '@sogdagim/orm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from '../Constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	@InjectRepository(User) private readonly userRepository: UserRepository

	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret
		})
	}

  async validate(payload: User) {
	const user = await this.userRepository.findOne(payload.id, { where: { accessToken: payload.accessToken } })
	if (!user) throw new UnauthorizedException('유효하지 않은 로그인입니다. 다시 로그인을 시도해주세요.')
	return user
  }
}
