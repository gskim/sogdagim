import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { ChatRepository } from '@repositories/ChatRepository'
import { LikeRepository } from '@repositories/LikeRepository'
import { PostRepository } from '@repositories/PostRepository'
import { UnlikeRepository } from '@repositories/UnlikeRepository'
import { Chat, ChatType, In, Like, Not, Post, Unlike, User } from '@sogdagim/orm'

@Injectable()
export class ChatService {

	@InjectRepository(Chat) private readonly chatRepository: ChatRepository

	async getOpenChats() {
		return await this.chatRepository.find({
			where: {
				type: Not(In([ChatType.RANDOM, ChatType.CLOSE]))
			}
		})

	}

}
