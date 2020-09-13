import { Chat, ChatType, EntityRepository, Repository, User } from '@sogdagim/orm'
import moment from 'moment-timezone'
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
			chat.expirationDate = moment().add(1, 'days').toDate()
			return await this.save(chat)
	}

}
