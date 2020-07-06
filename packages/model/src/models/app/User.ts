import { Expose, Type } from 'class-transformer'
import { IsDefined, IsEmail, IsEnum, IsString, Length } from 'class-validator'
import { Gender } from '../Common'

export class CommonUser {
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

export class GetUsersResponse {
	@Expose()
	@Type(() => CommonUser)
	users: CommonUser[]
}

export class PostUsersRequest {
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

export class PostUsersResponse {
	id: number
}

export class GetUsersDetailResponse {
	@Expose()
	@Type(() => CommonUser)
	data: CommonUser
}

export class PutUsersDetailRequest {
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

export class PutUsersDetailResponse {
	@Expose()
	@Type(() => CommonUser)
	data: CommonUser
}
