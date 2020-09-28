import { EntityRepository, Reply, Repository } from '@sogdagim/orm'

@EntityRepository(Reply)
export class ReplyRepository extends Repository<Reply> {

}
