import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ChatRepository } from '@repositories/ChatRepository'
import { MessageRepository } from '@repositories/MessageRepository'
import { UserRepository } from '@repositories/UserRepository'
import { Chat, ChatType, In, Message, Not, User } from '@sogdagim/orm'

@Injectable()
export class ChatService {

	@InjectRepository(Chat) private readonly chatRepository: ChatRepository
	@InjectRepository(Message) private readonly messageRepository: MessageRepository
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

	async entranceChat(chatId: number, user: User, password?: string) {
		try {
			const type = password ? ChatType.PRIVATE : ChatType.PUBLIC
			const chat = await this.chatRepository.findOne(chatId,
				{ relations: ['users'] })
			if (!chat) throw new NotFoundException('존재하지않는 채팅방 입니다')
			if (chat.users.length === chat.maxPersons) throw new NotFoundException('인원이 가득 찾습니다.')
			await this.chatRepository.save(chat)
			return true
		} catch (error) {
			return false
		}
	}

	async exitChat(chatId: number, currentUser: User) {
		try {
			const chat = await this.chatRepository.findOne(chatId,
				{ relations: ['users'] })
			if (!chat) throw new NotFoundException('존재하지않는 채팅방 입니다')
			chat.users = chat.users.filter((user) => user.id !== currentUser.id)
			await this.chatRepository.save(chat)
			return true
		} catch (error) {
			return false
		}
	}

	async getOpenChats() {
		return await this.chatRepository.find({
			loadRelationIds: { relations: ['users'] },
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

	async getMessages(chatId: number, currentUser: User) {
		this.messageRepository.createQueryBuilder()
	}

}
