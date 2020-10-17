import { Body, Controller, Get, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common'
import { LikeService } from '@services/LikeService'
import { User } from '@sogdagim/orm'
import { CurrentUser, JwtAuthGuard } from '../CustomDecorator'

@Controller()
@UseGuards(JwtAuthGuard)
export class LikeController {
	@Inject() private readonly likeService: LikeService
}
