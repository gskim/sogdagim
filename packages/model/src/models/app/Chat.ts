import { Expose, Type } from 'class-transformer'
import { IsDefined, IsEnum, IsNumber, IsString } from 'class-validator'
import { PostStatus } from '../Common'

export class OpenChatItem {
	@Expose()
	id: number

	@Expose()
	name: string

	@Expose()
	userCnt: number

	@Expose()
	maxUserCnt: number
}

export class GetChatsResponse {
	@Expose()
	@Type(() => OpenChatItem)
	chats: OpenChatItem[]
}

export class GetChatsRequest {

}
