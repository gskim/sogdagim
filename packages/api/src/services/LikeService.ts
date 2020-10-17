import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LikeRepository } from '@repositories/LikeRepository'
import { PostRepository } from '@repositories/PostRepository'
import { Like, Post, User } from '@sogdagim/orm'
import { pointAmount } from '../Constants'
import { PointService } from './PointService'

@Injectable()
export class LikeService {

	@InjectRepository(Post) private readonly postRepository: PostRepository
	@InjectRepository(Like) private readonly likeRepository: LikeRepository
	@Inject() private readonly pointService: PointService

	async like(postId: number, user: User) {
		try {
			const post = await this.postRepository.findOne(postId, { relations: ['user'] })
			if (!post) throw new NotFoundException('게시글을 찾을수없습니다.')
			const like = await this.likeRepository.findLike(post, user)
			if (like) {
				like.status = !like.status
				await like.save()
			} else {
				await this.likeRepository.create({
					post: post,
					user: user,
					status: true
				}).save()
			}
			await this.pointService.pointUp(post.user, pointAmount.like)
			return true
		} catch (error) {
			return false
		}
	}
}
