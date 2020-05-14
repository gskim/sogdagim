import { GetPostsDetailResponse, GetPostsResponse } from '@sogdagim/model'
import Api from './api'

export default class PostFetcher extends Api {
	async posts(): Promise<GetPostsResponse> {
		const url = `/posts`
		const data = await this.get<{}, GetPostsResponse>(url, {}) || {}
		return data
	}

	async postDetail(id: number): Promise<GetPostsDetailResponse> {
		const url = `/posts/${id}`
		const data = await this.get<{}, GetPostsDetailResponse>(url, {})
		return data
	}

}
