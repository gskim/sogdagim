import { Expose, Type } from 'class-transformer'
import { IsDefined, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { ChatType, PostStatus } from '../Common'

export class SimpleChatItem {
	@Expose()
	id: number

	@Expose()
	name: string

	@Expose()
	description: string

	@Expose()
	type: string

	@Expose()
	userCnt: number

	@Expose()
	maxPersons: number
}

export class GetChatsResponse {
	@Expose()
	@Type(() => SimpleChatItem)
	chats: SimpleChatItem[]
}

export class GetChatsRequest {

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
