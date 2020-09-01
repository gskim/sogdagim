import { Expose, Transform, Type } from 'class-transformer'
import { IsDefined, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import moment from 'moment'
import 'moment/locale/ko'
import { ChatType, PostStatus } from '../Common'

export class AdminSimpleChatItem {
	@Expose()
	id: number

	@Expose()
	name: string

	@Expose()
	description: string

	@Expose()
	type: ChatType

	@Expose()
	users: number[]

	@Expose()
	maxPersons: number
}

export class GetAdminChatsResponse {
	@Expose()
	@Type(() => AdminSimpleChatItem)
	chats: AdminSimpleChatItem[]
}

export class GetAdminChatsRequest {
	@IsOptional()
	@IsNumber()
	lastId?: number
}

export class PostAdminChatsRequest {
	@IsDefined()
	@IsString()
	name: string

	@IsDefined()
	@IsString()
	description: string

	@IsDefined()
	@IsEnum(ChatType)
	type: ChatType

	@IsDefined()
	@IsNumber()
	maxPersons: number

	@IsOptional()
	@IsString()
	password?: string
}

export class PostAdminChatsResponse {
	@Expose()
	@Type(() => AdminSimpleChatItem)
	data: AdminSimpleChatItem
}

export class AdminChatUser {
	@Expose()
	id: number
	@Expose()
	nickname: string
	@Expose()
	profilePhoto?: string
}

export class AdminChatDetail {

	@Expose()
	id: number

	@Expose()
	name: string

	@Expose()
	description: string

	@Expose()
	maxPersons: number

	@Expose()
	type: ChatType

	@Expose()
	@Type(() => AdminChatUser)
	users: AdminChatUser[]
}

export class GetAdminChatsDetailResponse {
	@Expose()
	@Type(() => AdminChatDetail)
	data: AdminChatDetail
}

export class PostAdminChatsUserRequest {
	@IsDefined()
	@IsNumber()
	userId: number
}

export class PostAdminChatsUserResponse {
	@Expose()
	@Type(() => AdminChatUser)
	users: AdminChatUser[]
}

export class AdminSimpleMessage {

	@Expose()
	id: number

	@Expose()
	text: string

	@Expose()
	isImage: boolean

	@Expose()
	isRead: boolean

	@Expose()
	@Transform((v: Date) => moment(v).fromNow(), { toClassOnly: true })
	createdAt: string

	@Expose()
	userId: number

	@Expose()
	nickname: string

	@Expose()
	profilePhoto: string | null
}

export class GetAdminChatsMessagesRequest {
	@IsOptional()
	@IsNumber()
	lastId?: number
}

export class GetAdminChatsMessagesResponse {
	@Expose()
	@Type(() => AdminSimpleMessage)
	messages: AdminSimpleMessage[]
}
