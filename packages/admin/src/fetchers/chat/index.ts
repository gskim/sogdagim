import { GetAdminChatsDetailResponse, GetAdminChatsMessagesRequest, GetAdminChatsMessagesResponse, GetAdminChatsRequest, GetAdminChatsResponse,
	PostAdminChatsUserRequest, PostAdminChatsUserResponse
 } from '@sogdagim/model'
import Api from '../api'

export default class ChatFetcher extends Api {

	async addChat() {

	}

	async getAllChats(params: GetAdminChatsRequest): Promise<GetAdminChatsResponse> {
		const url = `admin/chats`
		const res: GetAdminChatsResponse = await this.get<GetAdminChatsRequest>(url, params, false)
		return res
	}

	async getChat(chatId: number): Promise<GetAdminChatsDetailResponse> {
		const url = `admin/chats/${chatId}`
		const res: GetAdminChatsDetailResponse = await this.get(url, {}, false)
		return res
	}

	async addUser(chatId: number, userId: number): Promise<PostAdminChatsUserResponse> {
		const url = `admin/chats/${chatId}/users`
		console.log(typeof chatId)
		console.log(typeof userId)
		const res: PostAdminChatsUserResponse = await this.post<PostAdminChatsUserRequest>(url, { userId }, false)
		return res
	}

	async getMessages(chatId: number) {
		const url = `admin/chats/${chatId}/messages`
		const res: GetAdminChatsMessagesResponse = await this.get<GetAdminChatsMessagesRequest>(url, {}, false)
		return res
	}
}
