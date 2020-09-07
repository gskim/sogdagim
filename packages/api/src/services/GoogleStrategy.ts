import { Injectable, UnauthorizedException } from '@nestjs/common'
import { BadGatewayException, NotFoundException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '@repositories/UserRepository'
import { SignUpType, User } from '@sogdagim/orm'
import Axios from 'axios'
import { Strategy } from 'passport-local'
import { jwtConstants } from '../Constants'
import { AuthService } from './AuthService'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

	constructor(private readonly authService: AuthService) {
		super({ usernameField: 'code',passwordField: 'code' })
		console.log('%%%%%%%%%%%%%%%%%%%%%%%%')
	}

	async validate(code: string): Promise<any> {
		console.log('**********************')
		console.log(code)
		let profileResponse

		const param = {
			code: code,
			client_id: '329972956746-upskjt0aue8p7u1tp9bi24h9s05pvo6l.apps.googleusercontent.com',
			client_secret: 'KchJM__qS0Kci-eXi1VWvb5l',
			redirect_uri: 'postmessage',
			grant_type: 'authorization_code'
		}
		console.log('-------------------------')
		console.log(param)

		try {
			const googleTokenResult = await Axios({
				url: `https://www.googleapis.com/oauth2/v4/token`,
				method: 'post',
				data: param
			})
			console.log('==============')
			const profileURL = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleTokenResult.data.access_token}`
			profileResponse = await Axios({
				url: profileURL,
				method: 'get'
			})
		} catch(e) {
			console.log('---------')
			console.log(e)
			throw new NotFoundException(`존재하지 않는 이메일입니다.`)
		}

		const email = profileResponse.data.email
		console.log(email)
		console.log(profileResponse.data)
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
