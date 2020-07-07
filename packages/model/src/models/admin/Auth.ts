import { IsDefined, IsEmail, IsString } from 'class-validator'

export class PostAdminAuthsLoginResponse {
	accessToken: string
}

export class PostAdminAuthsSignupRequest {
	@IsEmail()
	@IsDefined()
	email: string

	@IsString()
	@IsDefined()
	password: string
}
