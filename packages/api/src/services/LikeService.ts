import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { LikeRepository } from '@repositories/LikeRepository'
import { PostRepository } from '@repositories/PostRepository'
import { Like, Post, User } from '@sogdagim/orm'

@Injectable()
export class LikeService {

	@InjectRepository(Post) private readonly postRepository: PostRepository
	@InjectRepository(Like) private readonly likeRepository: LikeRepository

	async like(postId: number, user: User) {
		try {
			const post = await this.postRepository.findOneOrFail(postId)
			const like = await this.likeRepository.findLike(post, user)
			if (!like.status) {
				like.status = true
				await like.save()
			}
			return true
		} catch (error) {
			return false
		}
	}
}
