import { Injectable, UnauthorizedException } from '@nestjs/common'
import { BadGatewayException, NotFoundException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { SignUpType, User } from '@sogdagim/orm'
import AppleAuth from 'apple-auth'
import Axios from 'axios'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import { Strategy } from 'passport-local'
import path from 'path'
import { AuthService } from './AuthService'

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {

	constructor(private readonly authService: AuthService) {
		super({ usernameField: 'code',passwordField: 'code' })
	}

	async validate(code: string, id_token: string): Promise<any> {
		console.log(code)
		const config = {
			client_id: 'im.sogdag.admin',
			team_id: 'XC98724CDR',
			redirect_uri: '',
			key_id: 'NR43RH24KC',
			scope: 'email'
		}

		try {
			const appleAuth = new AppleAuth(
				config,
				fs.readFileSync(path.resolve(__dirname, '../../AuthKey_NR43RH24KC.p8')).toString(),
				'text'
			)
			const apple = await appleAuth.accessToken(code)
			console.log(apple)
			const appleData = jwt.decode(apple.id_token)

			// const appleData = jwt.decode(id_token)
			console.log(appleData)
			// @ts-ignore
			let { sub: appleId, email: email } = appleData
			if (!email || email === '') {
				email = `${appleId}@apple.com`
			}
			const user = this.authService.getSnsUser(email, appleId, SignUpType.Apple)
			return user
		} catch(e) {
			console.log(e)
			throw new NotFoundException(`존재하지 않는 이메일입니다.`)
		}
	}

}
