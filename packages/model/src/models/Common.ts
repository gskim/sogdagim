import { Expose } from 'class-transformer'

// tslint:disable:variable-name
export class BaseModel<T, I> {
	success: boolean
	datas: T | null
	error: {
		code: I | null
		message: string | null
	} | null
}

export enum PostStatus {
	PUBLIC = 'public',
	PRIVATE = 'private',
	DELETE = 'delete'
}

export enum ReplyStatus {
	PUBLIC = 'public',
	PRIVATE = 'private',
	DELETE = 'delete'
}

export enum SignUpType {
	Email = 'email',
	Google = 'google',
	Apple = 'apple'
}

export enum Gender {
	Man = 'm',
	Woman = 'w'
}

export enum PointType {
	In = 'in',
	Out = 'out'
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
	FRIEND = 'friend',
	RANDOM = 'random',
	CLOSE = 'close'
}

export enum ChatQueueType {
	MATCH = 'match',
	READY = 'ready',
	OUT = 'out'
}

export class SimpleUser {
	id: number
	nickname: string
	email: string
	profileImage: string | undefined
}

export class ExpoDevice {
	isDevice: boolean

	brand: string | null

	manufacturer: string | null

	modelName: string | null

	// IOS only
	modelId: string | null

	// AND only
	designName: string | null

	// AND only
	productName: string | null

	deviceYearClass: number | null

	supportedCpuArchitectures: string[] | null

	osName: string

	osVersion: string

	osBuildId: string | null

	osInternalBuildId: string | null

	// AND only
	osBuildFingerprint: string | null

	// AND only
	platformApiLevel: number | null

	deviceName: string | null
}
