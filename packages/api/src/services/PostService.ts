import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostOrderSequenceRepository } from '@repositories/PostOrderSequenceRepository'
import { PostRepository } from '@repositories/PostRepository'
import { PostStatus } from '@sogdagim/model/models'
import { plainToClass, Post, PostOrderSequence, User } from '@sogdagim/orm'

@Injectable()
export class PostService {

	@InjectRepository(Post) private readonly postRepository: PostRepository
	@InjectRepository(PostOrderSequence) private readonly postOrderSequenceRepository: PostOrderSequenceRepository

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

	async getPost(id: number) {
		try {
			return await this.postRepository.findOneOrFail(id)
		} catch (error) {
			throw new BadRequestException('Not Found Post')
		}
	}

	async modifyPost(id: number, title: string, text: string, status: PostStatus, user: User) {
		const post = await this.getPost(id)
		post.title = title
		post.text = text
		post.status = status
		post.user = user
		return await post.save()
	}
}
