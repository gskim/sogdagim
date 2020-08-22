import { Chat, EntityRepository, Repository } from '@sogdagim/orm'

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {
}
