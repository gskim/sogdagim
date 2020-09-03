import { Expose, Type } from 'class-transformer'
import { IsDefined, IsEmail, IsEnum, IsString, Length } from 'class-validator'
import { Gender } from '../Common'

export class AdminCommonUser {
	@Expose()
	id: number
	@Expose()
	nickname: string
	@Expose()
	email: string
	@Expose()
	createdAt: Date
	@Expose()
	updatedAt: Date
}

export class GetAdminUsersResponse {
	@Expose()
	@Type(() => AdminCommonUser)
	users: AdminCommonUser[]
}

export class PostAdminUsersRequest {
	@IsEmail()
	@IsDefined()
	email: string
}

export class PostAdminUsersResponse {
	id: number
}

export class GetAdminUsersDetailResponse {
	@Expose()
	@Type(() => AdminCommonUser)
	data: AdminCommonUser
}

export class PutAdminUsersDetailRequest {
	@IsString()
	@IsDefined()
	nickname: string
}

export class PutAdminUsersDetailResponse {
	@Expose()
	@Type(() => AdminCommonUser)
	data: AdminCommonUser
}
