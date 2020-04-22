import { Expose, Type } from 'class-transformer'
import { Gender } from '../Common'

export class CommonUser {
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
}

export class GetUsersResponse {
	@Expose()
	@Type(() => CommonUser)
	users: CommonUser[]
}
