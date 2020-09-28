import { Expose, Type } from 'class-transformer'
import { IsDefined, IsEnum, IsNumber, IsString } from 'class-validator'
import { PostStatus } from '../Common'

export class PostItemUser {
	@Expose()
	id: number
	@Expose()
	nickname: string
	@Expose()
	profilePhoto: string | null
}

export class PostItem {
	@Expose()
	id: number
	@Expose()
	title: string
	@Expose()
	text: string
	@Expose()
	@Type(() => PostItemUser)
	user: PostItemUser
	@Expose()
	createdAt: Date
	@Expose()
	likeCnt: number
	@Expose()
	viewCnt: number
	@Expose()
	replyCnt: number
}

export class GetPostsResponse {
	@Expose()
	@Type(() => PostItem)
	posts: PostItem[]
}

export class PostPostsRequest {
	@IsString()
	@IsDefined()
	title: string

	@IsString()
	@IsDefined()
	text: string

	@IsEnum(PostStatus)
	@IsDefined()
	status: PostStatus
}

export class PostPostsResponse {
	id: number
}

export class GetPostsDetailResponse {
	@Expose()
	@Type(() => PostItem)
	data: PostItem
}

export class PutPostsDetailRequest {
	@IsString()
	@IsDefined()
	title: string

	@IsString()
	@IsDefined()
	text: string

	@IsEnum(PostStatus)
	@IsDefined()
	status: PostStatus
}

export class PutPostsDetailResponse {
	@Expose()
	@Type(() => PostItem)
	data: PostItem
}

export class ReplyItemUser {
	@Expose()
	id: number
	@Expose()
	nickname: string
	@Expose()
	profilePhoto: string | null
}

export class ReplyItem {
	@Expose()
	id: number
	@Expose()
	text: string
	@Expose()
	createdAt: Date
	@Expose()
	@Type(() => ReplyItemUser)
	user: ReplyItemUser
	@Expose()
	@Type(() => ReplyItem)
	children: ReplyItem[]
}

export class PostPostsDetailReplyRequest {
	@IsDefined()
	@IsNumber()
	postId: number

	@IsDefined()
	@IsNumber()
	parentId: number

	@IsDefined()
	@IsString()
	text: string
}

export class PostPostsDetailReplyResponse {
	@Expose()
	@Type(() => ReplyItem)
	data: ReplyItem
}

export class GetPostsDetailRepliesResponse {
	@Expose()
	@Type(() => ReplyItem)
	replies: ReplyItem[]
}
