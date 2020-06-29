import { IsDefined, IsEmail, IsString } from 'class-validator'

export class PostAuthsLoginResponse {
	accessToken: string
}

export class PostAuthsSignupRequest {
	@IsEmail()
	@IsDefined()
	email: string

	@IsString()
	@IsDefined()
	password: string
}
