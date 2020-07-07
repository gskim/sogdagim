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
	gender?: Gender
	@Expose()
	birthYear?: number
	@Expose()
	birthMonth?: number
	@Expose()
	birthDay?: number
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
	@IsString()
	@IsDefined()
	email: string

	@IsString()
	@IsDefined()
	nickname: string

	@IsEnum(Gender)
	@IsDefined()
	gender: Gender

	@IsString()
	@IsDefined()
	@Length(4, 4)
	birthYear: string

	@IsString()
	@IsDefined()
	@Length(2, 2)
	birthMonth: string

	@IsString()
	@IsDefined()
	@Length(2, 2)
	birthDay: string
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

	@IsEnum(Gender)
	@IsDefined()
	gender: Gender

	@IsString()
	@IsDefined()
	@Length(4, 4)
	birthYear: string

	@IsString()
	@IsDefined()
	@Length(2, 2)
	birthMonth: string

	@IsString()
	@IsDefined()
	@Length(2, 2)
	birthDay: string
}

export class PutAdminUsersDetailResponse {
	@Expose()
	@Type(() => AdminCommonUser)
	data: AdminCommonUser
}
