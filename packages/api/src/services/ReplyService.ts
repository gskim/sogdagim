import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostRepository } from '@repositories/PostRepository'
import { ReplyOrderSequenceRepository } from '@repositories/ReplyOrderSequenceRepository'
import { ReplyRepository } from '@repositories/ReplyRepository'
import { PostStatus } from '@sogdagim/model/models'
import { plainToClass, Post, PostOrderSequence, Reply, ReplyOrderSequence, ReplyStatus, User } from '@sogdagim/orm'

@Injectable()
export class ReplyService {

	@InjectRepository(Post) private readonly postRepository: PostRepository
	@InjectRepository(Post) private readonly replyRepository: ReplyRepository
	@InjectRepository(ReplyOrderSequence) private readonly replyOrderSequenceRepository: ReplyOrderSequenceRepository

	async addReply(postId: number, parentId: number, text: string, user: User) {
		const [post, parentReply] = await Promise.all([
			this.postRepository.findOneOrFail(postId),
			this.replyRepository.findOneOrFail(parentId)
		])

		const reply = this.replyRepository.create()
		reply.text = text
		reply.user = user
		const replyOrderSequence = await this.replyOrderSequenceRepository.save(new ReplyOrderSequence())
		reply.orderId = replyOrderSequence.id * -1
		return await this.replyRepository.save(reply)
	}

	async getReplies(postId: number) {
		return await this.replyRepository.find({
			where: {
				post: plainToClass(Post, { id: postId })
			}
		})
	}

	async getRereplies(replyId: number) {
		return await this.replyRepository.find({
			relations: ['user', 'replyCount'],
			where: {
				parent: plainToClass(Reply, { id: replyId })
			}
		})
	}
}
