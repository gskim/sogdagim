import { Injectable, UnauthorizedException } from '@nestjs/common'
import { BadGatewayException, NotFoundException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { SignUpType, User } from '@sogdagim/orm'
import Axios from 'axios'
import jwt from 'jsonwebtoken'
import { Strategy } from 'passport-local'
import { AuthService } from './AuthService'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

	constructor(private readonly authService: AuthService) {
		super({ usernameField: 'code', passwordField: 'code' })
	}

	async validate(code: string): Promise<any> {
		// if (code === 'code') {
		// 	const data = jwt.decode(idToken)
		// 		console.log(data)
		// 		// @ts-ignore
		// 		let { sub: googleId, email: email } = data
		// 		if (!email || email === '') {
		// 			email = `${googleId}@google.com`
		// 		}
		// 		const user = this.authService.getSnsUser(email, googleId, SignUpType.Google)
		// 		return user
		// }
		let profileResponse
		const param = {
			code: code,
			client_id: process.env.GOOGLE_CLIENT_ID,
			client_secret: process.env.GOOGLE_SECRET,
			redirect_uri: 'postmessage',
			grant_type: 'authorization_code'
		}
		try {
			const googleTokenResult = await Axios({
				url: `https://www.googleapis.com/oauth2/v4/token`,
				method: 'post',
				data: param
			})
			console.log(googleTokenResult)
			const profileURL = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleTokenResult.data.access_token}`
			profileResponse = await Axios({
				url: profileURL,
				method: 'get'
			})
			console.log(profileURL)
		} catch(e) {
			console.log(e)
			throw new NotFoundException(`존재하지 않는 이메일입니다.`)
		}
		// {
		// 	id: '109782026187960972183',
		// 	email: 'kiseon1987@gmail.com',
		// 	verified_email: true,
		// 	name: 'GiSeon KIM',
		// 	given_name: 'GiSeon',
		// 	family_name: 'KIM',
		// 	picture: 'https://lh4.googleusercontent.com/-JHcV8sCB5Iw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmsEkHMjAc6kcxvxvcqkZ_qayaluQ/photo.jpg',
		// 	locale: 'ko'
		//   }
		const user = this.authService.getSnsUser(profileResponse.data.email, profileResponse.data.id, SignUpType.Google)
		return user
	}

}
