import { Expose, Type } from 'class-transformer'
import { IsDefined, IsEnum, IsNumber, IsString } from 'class-validator'
import { PostStatus } from '../Common'

export class AdminPostItemUser {
	@Expose()
	id: number
}

export class AdminPostItem {
	@Expose()
	id: number
	@Expose()
	title: string
	@Expose()
	text: string
	@Expose()
	status?: PostStatus
	@Expose()
	@Type(() => AdminPostItemUser)
	user: AdminPostItemUser
	@Expose()
	createdAt: Date
	@Expose()
	updatedAt: Date
}

export class GetAdminPostsResponse {
	@Expose()
	@Type(() => AdminPostItem)
	posts: AdminPostItem[]
}

export class PostAdminPostsRequest {
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

export class PostAdminPostsResponse {
	id: number
}

export class GetAdminPostsDetailResponse {
	@Expose()
	@Type(() => AdminPostItem)
	data: AdminPostItem
}

export class PutAdminPostsDetailRequest {
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

export class PutAdminPostsDetailResponse {
	@Expose()
	@Type(() => AdminPostItem)
	data: AdminPostItem
}

export class AdminReplyItemUser {
	@Expose()
	nickname: string
	@Expose()
	profilePhoto?: string
}

export class AdminReplyItem {
	@Expose()
	id: number
	@Expose()
	text: string
	@Expose()
	createdAt: Date
	@Expose()
	@Type(() => AdminReplyItemUser)
	user: AdminReplyItemUser
	@Expose()
	@Type(() => AdminReplyItem)
	children: AdminReplyItem[]
}

export class PostAdminPostsDetailReplyRequest {
	@IsDefined()
	@IsNumber()
	parentId: number

	@IsDefined()
	@IsString()
	text: string
}

export class PostAdminPostsDetailReplyResponse {
	@Expose()
	@Type(() => AdminReplyItem)
	data: AdminReplyItem
}

export class GetAdminPostsDetailRepliesResponse {
	@Expose()
	@Type(() => AdminReplyItem)
	replies: AdminReplyItem[]
}
