import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ChatRepository } from '@repositories/ChatRepository'
import { MessageRepository } from '@repositories/MessageRepository'
import { UserRepository } from '@repositories/UserRepository'
import { plainToClass, Chat, ChatType, In, Message, MoreThan, Not, User } from '@sogdagim/orm'

@Injectable()
export class ChatService {

	@InjectRepository(Chat) private readonly chatRepository: ChatRepository
	@InjectRepository(Message) private readonly messageRepository: MessageRepository
	@InjectRepository(User) private readonly userRepository: UserRepository

	async getChatInfo(chatId: number) {
		const chat = await this.chatRepository.findOne(chatId, {
			relations: ['users']
		})
		if (!chat) throw new NotFoundException('존재하지않는 채팅방 입니다')
		return chat
	}

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
			const chat = await this.chatRepository.findOne(chatId,
				{ relations: ['users'] })
			if (!chat) throw new NotFoundException('존재하지않는 채팅방 입니다')
			if (chat.users.length === chat.maxPersons) throw new NotFoundException('인원이 가득 찾습니다')
			if (chat.type === ChatType.PRIVATE) {
				if (!password) throw new BadRequestException('비밀번호를 입력해주세요')
				if (chat.password !== password) throw new BadRequestException('비밀번호가 일치하지 않습니다')
			}
			chat.users.push(user)
			await this.chatRepository.save(chat)
			return true
		} catch (error) {
			throw error
		}
	}

	async addUser(userId: number, chatId: number) {
		const chat = await this.chatRepository.findOne(chatId, { relations: ['users'] })
		if (!chat) throw new NotFoundException('존재하지않는 채팅방 입니다')
		if (chat.users.length === chat.maxPersons) throw new NotFoundException('인원이 가득 찾습니다')
		const existUser = chat.users.some((user) => user.id === userId)
		if (existUser) throw new BadRequestException('이미 추가되어있는 유저입니다.')
		const user = await this.userRepository.findOne(userId)
		if (!user) throw new NotFoundException('존재하지않는 유저입니다.')
		chat.users.push(user)
		const result = await this.chatRepository.save(chat)
		return result.users
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
			throw error
		}
	}

	async getOpenChats(lastId: number = 0) {
		return await this.chatRepository.find({
			loadRelationIds: { relations: ['users'] },
			where: {
				type: Not(In([ChatType.RANDOM, ChatType.CLOSE])),
				id: MoreThan(lastId)
			},
			order: { id: 'ASC' },
			take: 30
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

	async getMessages(chatId: number, lastId?: number) {
		const query = this.messageRepository.createQueryBuilder('message')
		.addSelect('message.id', 'id')
		.addSelect('message.text', 'text')
		.addSelect('message.isRead', 'isRead')
		.addSelect('message.isImage', 'isImage')
		.addSelect('message.createdAt', 'createdAt')
		.addSelect('user.id', 'userId')
		.addSelect('user.nickname', 'nickname')
		.addSelect('user.profilePhoto', 'profilePhoto')
		.innerJoin('message.user', 'user')
		.andWhere(`chat_id = ${chatId}`)
		.limit(30)
		if (lastId) query.andWhere(`message.id < ${lastId}`)
		return await query.getRawMany()
		// return await this.messageRepository.find({ where: { chat: plainToClass(Chat, { id: chatId }) } })
	}
}
