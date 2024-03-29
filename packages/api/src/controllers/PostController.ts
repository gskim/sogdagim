import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, Post, Put, Query, SerializeOptions, UseGuards, UseInterceptors } from '@nestjs/common'
import { LikeService } from '@services/LikeService'
import { PointService } from '@services/PointService'
import { PostService } from '@services/PostService'
import { ReplyService } from '@services/ReplyService'
import { plainToClass } from '@sogdagim/model'
import { GetPostsDetailRepliesResponse, GetPostsDetailResponse, GetPostsRequest, GetPostsResponse,
	PostPostsDetailReplyRequest, PostPostsDetailReplyResponse, PostPostsRequest, PostPostsResponse, PutPostsDetailRequest, PutPostsDetailResponse
 } from '@sogdagim/model'
import { User } from '@sogdagim/orm'
import { CurrentUser, JwtAuthGuard } from '../CustomDecorator'

@Controller()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
export class PostController {

	@Inject()
	private readonly postService: PostService
	@Inject()
	private readonly replyService: ReplyService
	@Inject()
	private readonly likeService: LikeService
	@Inject()
	private readonly pointService: PointService

	@Get('/posts')
	async posts(@Query() params: GetPostsRequest) {
		const posts = await this.postService.getPosts(params.lastOrderId)
		return plainToClass(GetPostsResponse, { posts: posts })
	}

	@Post('/posts')
	async addPost(@Body() params: PostPostsRequest, @CurrentUser() currentUser: User): Promise<PostPostsResponse> {
		const post = await this.postService.addPost(params.title, params.text, params.status, currentUser)
		return { id: post.id }
	}

	@Get('/posts/:id')
	async getPost(@Param('id') id: number, @CurrentUser() currentUser: User): Promise<GetPostsDetailResponse> {
		const post = await this.postService.getPost(id, currentUser)
		return plainToClass(GetPostsDetailResponse, { data: post })
	}

	@Put('/posts/:id')
	async modifyPost(@Param('id') id: number, @Body() params: PutPostsDetailRequest, @CurrentUser() currentUser: User): Promise<PutPostsDetailResponse> {
		const post = await this.postService.modifyPost(id, params.title, params.text, params.status, currentUser)
		return plainToClass(PutPostsDetailResponse, { data: post })
	}

	@Get('/posts/:id/replies')
	async getReplies(@Param('id') id: number): Promise<GetPostsDetailRepliesResponse> {
		const replies = await this.replyService.getReplies(id)
		return plainToClass(GetPostsDetailRepliesResponse, { replies: replies })
	}

	@Post('/posts/:id/replies')
	async addReply(
	@Param('id') id: number,
	@Body() params: PostPostsDetailReplyRequest,
	@CurrentUser() currentUser: User): Promise<PostPostsDetailReplyResponse> {
		const reply = await this.replyService.addReply(params.postId, params.parentId, params.text, currentUser)
		return plainToClass(PostPostsDetailReplyResponse, { data: reply })
	}

	@Put('/posts/:id/likes')
	async like(@CurrentUser() currentUser: User, @Param('id') postId: number) {
		const result = await this.likeService.like(postId, currentUser)

		return {
			success: result
		}
	}
}
