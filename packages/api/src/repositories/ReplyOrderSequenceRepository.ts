import { EntityRepository, ReplyOrderSequence, Repository } from '@sogdagim/orm'

@EntityRepository(ReplyOrderSequence)
export class ReplyOrderSequenceRepository extends Repository<ReplyOrderSequence> {
}
