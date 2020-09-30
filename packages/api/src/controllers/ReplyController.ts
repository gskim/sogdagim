import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, Post, Req, SerializeOptions, UseGuards, UseInterceptors } from '@nestjs/common'
import { ReplyService } from '@services/ReplyService'
import { GetRepliesRerepliesResponse } from '@sogdagim/model'
import { plainToClass, User } from '@sogdagim/orm'
import { CurrentUser, JwtAuthGuard } from '../CustomDecorator'

@Controller()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
export class ReplyController {
	@Inject() private readonly replyService: ReplyService

	@Get('/replies/:id/rereplies')
	async rereplies(@CurrentUser() currentUser: User,
	@Param('id') replyId: number): Promise<GetRepliesRerepliesResponse> {
		const rereplies = await this.replyService.getRereplies(replyId)
		return plainToClass(GetRepliesRerepliesResponse, { rereplies: rereplies })
	}
}
