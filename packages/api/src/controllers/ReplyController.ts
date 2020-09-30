import { Body, Controller, Get, Inject, Param, Post, Req, UseGuards } from '@nestjs/common'
import { LikeService } from '@services/LikeService'
import { ReplyService } from '@services/ReplyService'
import { User } from '@sogdagim/orm'
import { CurrentUser, JwtAuthGuard } from '../CustomDecorator'

@Controller()
@UseGuards(JwtAuthGuard)
export class ReplyController {
	@Inject() private readonly replyService: ReplyService

	@Get('/replies/:id/rereplies')
	async rereplies(@CurrentUser() currentUser: User, @Param('id') replyId: number) {
		return await this.replyService.getRereplies(replyId)
	}
}
