import { EntityRepository, PostOrderSequence, Repository } from '@sogdagim/orm'

@EntityRepository(PostOrderSequence)
export class PostOrderSequenceRepository extends Repository<PostOrderSequence> {
}
