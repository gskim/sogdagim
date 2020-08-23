import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { ChatRepository } from '@repositories/ChatRepository'
import { UserRepository } from '@repositories/UserRepository'

import { Chat, ChatType, In, Like, Not, Post, Unlike, User } from '@sogdagim/orm'

@Injectable()
export class ChatService {

	@InjectRepository(Chat) private readonly chatRepository: ChatRepository
	@InjectRepository(User) private readonly userRepository: UserRepository

	async createChat(name: string, description: string, user: User, type: ChatType, maxPersons: number,
		password?: string) {
		const chat = this.chatRepository.create()
		chat.name = name
		chat.description = description
		chat.type = type
		chat.maxPersons = maxPersons
		chat.password = password
		chat.users = [user]
		return await this.chatRepository.save(chat)
	}

	async getOpenChats() {
		return await this.chatRepository.find({
			where: {
				type: Not(In([ChatType.RANDOM, ChatType.CLOSE]))
			}
		})
	}

	async getMyChats(currentUser: User) {
		const user = await this.userRepository.createQueryBuilder('user')
		.innerJoinAndSelect('user.chats', 'chats')
		.andWhere(`user.id = :userId`, { userId: currentUser.id })
		.getOne()
		if (user) {
			return user.chats
		}
		return []
	}

}
