import { EntityRepository, MessageOrderSequence, Repository } from '@sogdagim/orm'

@EntityRepository(MessageOrderSequence)
export class MessageOrderSequenceRepository extends Repository<MessageOrderSequence> {
}
