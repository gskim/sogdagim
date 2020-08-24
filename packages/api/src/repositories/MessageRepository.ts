import { EntityRepository, Message, Repository } from '@sogdagim/orm'

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
}
