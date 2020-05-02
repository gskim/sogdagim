import { CommonUser, GetUsersDetailResponse, GetUsersResponse, PostUsersRequest, PostUsersResponse, PutUsersDetailRequest,
	PutUsersDetailResponse
 } from '@sogdagim/model/models'
import Api from '../api'

export default class UserFetcher extends Api {

	async getUserMe(): Promise<CommonUser> {
		const url = `/auths/me`
		const res: CommonUser = await this.get(url, {})

		return res
	}
	async getUsers(): Promise<CommonUser[]> {
		const url = `/users`
		const res: GetUsersResponse = await this.get(url, {})
		return res.users
	}

	async addUser(params: PostUsersRequest): Promise<PostUsersResponse> {
		const url = `/users`
		const res = await this.post(url, params)
		return res
	}

	async getUser(id: number): Promise<GetUsersDetailResponse> {
		const url = `/users/${id}`
		const res = await this.get(url, {})
		return res
	}

	async modifyUser(id: number, params: PutUsersDetailRequest): Promise<PutUsersDetailResponse> {
		const url = `/users/${id}`
		const res = await this.put(url, params)
		return res
	}

}
