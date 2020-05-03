import { GetPostsDetailRepliesResponse, GetPostsDetailResponse, GetPostsResponse, PostPostsDetailReplyRequest, PostPostsDetailReplyResponse, PostPostsRequest,
	PostPostsResponse, PutPostsDetailRequest, PutPostsDetailResponse
 } from '@sogdagim/model/models'
import Api from '../api'

export default class PostFetcher extends Api {
	async getPosts(): Promise<GetPostsResponse> {
		const url = `/posts`
		const res: GetPostsResponse = await this.get(url, {})
		return res
	}

	async addPost(params: PostPostsRequest): Promise<PostPostsResponse> {
		const url = `/posts`
		const res: PostPostsResponse = await this.post(url, params)
		return res
	}

	async getPost(id: number): Promise<GetPostsDetailResponse> {
		const url = `/posts/${id}`
		const res: GetPostsDetailResponse = await this.get(url, {})
		return res
	}

	async modifyPost(id: number, params: PutPostsDetailRequest): Promise<PutPostsDetailResponse> {
		const url = `/posts/${id}`
		const res: PutPostsDetailResponse = await this.put(url, params)
		return res
	}

	async addReply(id: number, params: PostPostsDetailReplyRequest): Promise<PostPostsDetailReplyResponse> {
		const url = `/posts/${id}/replies`
		const res: PostPostsDetailReplyResponse = await this.post(url, params)
		return res
	}

	async getReplies(id: number): Promise<GetPostsDetailRepliesResponse> {
		const url = `/posts/${id}/replies`
		const res: GetPostsDetailRepliesResponse = await this.get(url, {})
		return res
	}
}
