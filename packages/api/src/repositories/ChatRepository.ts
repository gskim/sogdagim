import { Chat, ChatType, EntityRepository, Repository, User } from '@sogdagim/orm'

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {

	async addChat(users: User[], type: ChatType, maxPersons: number,
		password?: string, name?: string, description?: string) {
			const chat = this.create()
			chat.name = name
			chat.description = description
			chat.type = type
			chat.maxPersons = maxPersons
			chat.password = password
			chat.users = users
			return await this.save(chat)
	}

}
