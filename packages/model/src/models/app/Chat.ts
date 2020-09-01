import { Expose, Transform, Type } from 'class-transformer'
import { IsDefined, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import moment from 'moment'
import 'moment/locale/ko'
import { ChatType, PostStatus } from '../Common'

export class SimpleChatItem {
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

export class GetChatsResponse {
	@Expose()
	@Type(() => SimpleChatItem)
	chats: SimpleChatItem[]
}

export class GetChatsRequest {
	@IsOptional()
	@IsNumber()
	lastId?: number
}

export class PostChatsRequest {
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

export class PostChatsResponse {
	@Expose()
	@Type(() => SimpleChatItem)
	data: SimpleChatItem
}

export class PutChatsEntranceRequest {
	@IsOptional()
	@IsString()
	password?: string
}

export class PutChatsEntranceResponse {
	data: {
		success: boolean
	}
}

export class ChatUser {
	@Expose()
	id: number
	@Expose()
	nickname: string
	@Expose()
	profilePhoto?: string
}

export class ChatDetail {
	@Expose()
	name: string

	@Expose()
	description: string

	@Expose()
	maxPersons: number

	@Expose()
	type: ChatType

	@Expose()
	@Type(() => ChatUser)
	users: ChatUser[]
}

export class GetChatsDetailResponse {
	@Expose()
	@Type(() => ChatDetail)
	data: ChatDetail
}

export class SimpleMessage {

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

export class GetChatsMessagesRequest {
	@IsOptional()
	@IsNumber()
	lastId?: number
}

export class GetChatsMessagesResponse {
	@Expose()
	@Type(() => SimpleMessage)
	messages: SimpleMessage[]
}
