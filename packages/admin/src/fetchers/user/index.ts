import { AdminCommonUser, GetAdminUsersDetailResponse, GetAdminUsersResponse,
	PostAdminUsersRequest, PostAdminUsersResponse, PutAdminUsersDetailRequest,
	PutAdminUsersDetailResponse
 } from '@sogdagim/model'
import Api from '../api'

export default class UserFetcher extends Api {

	async getUserMe(): Promise<AdminCommonUser> {
		const url = `/auths/me`
		const res: AdminCommonUser = await this.get(url, {})

		return res
	}
	async getUsers(): Promise<AdminCommonUser[]> {
		const url = `/users`
		const res: GetAdminUsersResponse = await this.get(url, {})
		return res.users
	}

	async addUser(params: PostAdminUsersRequest): Promise<PostAdminUsersResponse> {
		const url = `/users`
		const res = await this.post(url, params)
		return res
	}

	async getUser(id: number): Promise<GetAdminUsersDetailResponse> {
		const url = `/users/${id}`
		const res = await this.get(url, {})
		return res
	}

	async modifyUser(id: number, params: PutAdminUsersDetailRequest): Promise<PutAdminUsersDetailResponse> {
		const url = `/users/${id}`
		const res = await this.put(url, params)
		return res
	}

}
