// tslint:disable:variable-name
export class BaseModel<T, I> {
	success: boolean
	datas: T | null
	error: {
		code: I | null
		message: string | null
	} | null
}

export class CommonUser {
	nickname: string
}

export enum PostStatus {
	PUBLIC = 'public',
	PRIVATE = 'private',
	DELETE = 'delete'
}

export enum Gender {
	Man = 'm',
	Woman = 'w'
}

export enum NotificationType {
	LIKE = 'like',
	UNLIKE = 'unlike',
	REPLY = 'reply',
	INVITE = 'invite',
	ACCEPT = 'accept',
	LEAVE = 'leave',
	EXPIRE = 'expire',
	EXTEND = 'extend'
}

export enum ChatType {
	PUBLIC = 'public',
	PRIVATE = 'private',
	RANDOM = 'random',
	CLOSE = 'close'
}
