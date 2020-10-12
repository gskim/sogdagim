import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostCountRepository } from '@repositories/PostCountRepository'
import { PostOrderSequenceRepository } from '@repositories/PostOrderSequenceRepository'
import { PostRepository } from '@repositories/PostRepository'
import { PostStatus } from '@sogdagim/model/models'
import { plainToClass, Equal, Not, Post, PostCount, PostOrderSequence, User } from '@sogdagim/orm'

@Injectable()
export class PostService {

	@InjectRepository(Post) private readonly postRepository: PostRepository
	@InjectRepository(PostOrderSequence) private readonly postOrderSequenceRepository: PostOrderSequenceRepository
	@InjectRepository(PostCount) private readonly postCountRepository: PostCountRepository

	async getPosts(lastOrderId?: number) {
		return await this.postRepository.getPosts(lastOrderId)
	}

	async addPost(title: string, text: string, status: PostStatus, user: User) {
		const post = this.postRepository.create()
		post.title = title
		post.text = text
		post.status = status
		post.user = user
		const postOrderSequence = await this.postOrderSequenceRepository.save(new PostOrderSequence())
		post.orderId = postOrderSequence.id * -1
		return await post.save()
	}

	async getPost(id: number, currentUser: User) {
		try {
			const post = await this.postRepository.findOneOrFail(id, {
				relations: ['user'],
				where: {
					status: Not(PostStatus.DELETE)
				}
			})
			if (post.status === PostStatus.PRIVATE) {
				if (post.user.id !== currentUser.id) {
					throw new NotFoundException('Not Found Post(1)')
				}
			}
			await this.postCountRepository.increment({
				post: post
			}, 'viewCnt', 1)
			return post
		} catch (error) {
			throw new NotFoundException('Not Found Post(2)')
		}
	}

	async modifyPost(id: number, title: string, text: string, status: PostStatus, user: User) {
		const post = await this.getPost(id, user)
		post.title = title
		post.text = text
		post.status = status
		return await post.save()
	}
}
