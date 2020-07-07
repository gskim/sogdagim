import { GetAdminPostsDetailRepliesResponse, GetAdminPostsDetailResponse, GetAdminPostsResponse,
	PostAdminPostsDetailReplyRequest, PostAdminPostsDetailReplyResponse,
	PostAdminPostsRequest,
	PostAdminPostsResponse, PutAdminPostsDetailRequest, PutAdminPostsDetailResponse
 } from '@sogdagim/model'
import Api from '../api'

export default class PostFetcher extends Api {
	async getPosts(): Promise<GetAdminPostsResponse> {
		const url = `/posts`
		const res: GetAdminPostsResponse = await this.get(url, {})
		return res
	}

	async addPost(params: PostAdminPostsRequest): Promise<PostAdminPostsResponse> {
		const url = `/posts`
		const res: PostAdminPostsResponse = await this.post(url, params)
		return res
	}

	async getPost(id: number): Promise<GetAdminPostsDetailResponse> {
		const url = `/posts/${id}`
		const res: GetAdminPostsDetailResponse = await this.get(url, {})
		return res
	}

	async modifyPost(id: number, params: PutAdminPostsDetailRequest): Promise<PutAdminPostsDetailResponse> {
		const url = `/posts/${id}`
		const res: PutAdminPostsDetailResponse = await this.put(url, params)
		return res
	}

	async addReply(id: number, params: PostAdminPostsDetailReplyRequest): Promise<PostAdminPostsDetailReplyResponse> {
		const url = `/posts/${id}/replies`
		const res: PostAdminPostsDetailReplyResponse = await this.post(url, params)
		return res
	}

	async getReplies(id: number): Promise<GetAdminPostsDetailRepliesResponse> {
		const url = `/posts/${id}/replies`
		const res: GetAdminPostsDetailRepliesResponse = await this.get(url, {})
		return res
	}
}
