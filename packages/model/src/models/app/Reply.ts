import { Expose, Type } from 'class-transformer'

export class RereplyItemUser {
	@Expose()
	id: number
	@Expose()
	nickname: string
	@Expose()
	profilePhoto: string | null
}

export class RereplyItemCount {
	@Expose()
	likeCnt: number
	@Expose()
	replyCnt: number
}

export class RereplyItem {
	@Expose()
	id: number
	@Expose()
	text: string
	@Expose()
	createdAt: string
	@Expose()
	@Type(() => RereplyItemUser)
	user: RereplyItemUser
	@Expose()
	@Type(() => RereplyItemCount)
	replyCount: RereplyItemCount
}

export class GetRepliesRerepliesResponse {
	@Expose()
	@Type(() => RereplyItem)
	rereplies: RereplyItem[]

}
