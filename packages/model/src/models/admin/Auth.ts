import { Expose, Type } from 'class-transformer'
import { IsDefined, IsEmail, IsString } from 'class-validator'
export class PostAuthsLoginRequest {
	@IsEmail()
	@IsDefined()
	email: string

	@IsString()
	@IsDefined()
	password: string
}

export class PostAuthsLoginResponse {
	accessToken: string
}
