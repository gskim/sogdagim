import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LikeRepository } from '@repositories/LikeRepository'
import { PostRepository } from '@repositories/PostRepository'
import { Like, Post, User } from '@sogdagim/orm'

@Injectable()
export class PointService {

	@InjectRepository(Post) private readonly postRepository: PostRepository
	@InjectRepository(Like) private readonly likeRepository: LikeRepository

	async pointUp(postId: number, user: User) {

	}
}
