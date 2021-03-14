import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { BadGatewayException, NotFoundException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { SignUpType, User } from '@sogdagim/orm'
import AppleAuth from 'apple-auth'
import Axios from 'axios'
import jwt from 'jsonwebtoken'
import { Strategy } from 'passport-local'
import path from 'path'
import { AuthService } from './AuthService'
import { ConfigService } from './ConfigService'
import { S3Service } from './S3Service'

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {

	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
		private readonly s3Service: S3Service
		) {
		super({ usernameField: 'code',passwordField: 'id_token' })
	}

	async validate(code: string, id_token: string): Promise<any> {
		const config = {
			client_id: 'im.sogdag.admin',
			team_id: 'XC98724CDR',
			redirect_uri: '',
			key_id: 'NR43RH24KC',
			scope: 'email'
		}
		try {
			if (code === 'code') {
				const appleData = jwt.decode(id_token)
				console.log(appleData)
				// @ts-ignore
				let { sub: appleId, email: email } = appleData
				if (!email || email === '') {
					email = `${appleId}@apple.com`
				}
				const user = this.authService.getSnsUser(email, appleId, SignUpType.Apple)
				return user
			}

			const privateKey = await this.s3Service.getObject(this.configService.getString('APPLE_AUTH_KEY'))
			console.log(privateKey)
			if (privateKey) {
				const appleAuth = new AppleAuth(
					config,
					privateKey,
					'text'
				)
				console.log(code)
				const apple = await appleAuth.accessToken(code)
				console.log(apple)
				const appleData = jwt.decode(apple.id_token)
				console.log(appleData)
				// @ts-ignore
				let { sub: appleId, email: email } = appleData
				if (!email || email === '') {
					email = `${appleId}@apple.com`
				}
				const user = this.authService.getSnsUser(email, appleId, SignUpType.Apple)
				return user
			} else {
				throw new BadRequestException('로그인 할수 없습니다.')
			}

		} catch(e) {
			console.log(e)
			throw new NotFoundException(`존재하지 않는 이메일입니다.`)
		}
	}

}
