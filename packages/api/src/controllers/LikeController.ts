import { Body, Controller, Get, Inject, Param, Post, Req, UseGuards } from '@nestjs/common'
import { LikeService } from '@services/LikeService'
import { PostAuthsSignupRequest } from '@sogdagim/model'
import { User } from '@sogdagim/orm'
import { CurrentUser, JwtAuthGuard } from '../CustomDecorator'

@Controller()
@UseGuards(JwtAuthGuard)
export class LikeController {
	@Inject() private readonly likeService: LikeService

	@Post('/likes/like/:postId')
	async like(@CurrentUser() currentUser: User, @Param('postId') postId: number) {
		const result = await this.likeService.like(postId, currentUser)
		return {
			success: result
		}
	}

	@Post('/likes/unlike/:postId')
	async unlike(@CurrentUser() currentUser: User, @Param('postId') postId: number) {
		const result = await this.likeService.unlike(postId, currentUser)
		return {
			success: result
		}
	}
}
