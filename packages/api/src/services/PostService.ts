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

	async getPosts() {
		return await this.postRepository.getPosts()
	}

	async addPost(title: string, text: string, status: PostStatus, user: User, parent?: Post) {
		const post = this.postRepository.create()
		post.title = title
		post.text = text
		post.status = status
		post.user = user
		if (parent) post.parent = parent
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

	async addReply(parentId: number, text: string, user: User) {
		const parentPost = await this.getPost(parentId)
		const reply = await this.addPost('', text, PostStatus.PUBLIC, user, parentPost)
		return reply
	}

	async getReplies(id: number) {
		const replies = await this.postRepository.getReplies(id)
		return replies
	}

}
