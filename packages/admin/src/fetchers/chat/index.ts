import { GetAdminChatsDetailResponse, GetAdminChatsRequest, GetAdminChatsResponse
 } from '@sogdagim/model'
import Api from '../api'

export default class ChatFetcher extends Api {
	async getAllChats(params: GetAdminChatsRequest): Promise<GetAdminChatsResponse> {
		const url = `/chats`
		const res: GetAdminChatsResponse = await this.get<GetAdminChatsRequest>(url, params, false)
		return res
	}

	async getChat(chatId: number): Promise<GetAdminChatsDetailResponse> {
		const url = `/chats/${chatId}`
		const res: GetAdminChatsDetailResponse = await this.get(url, {}, false)
		return res
	}
}
