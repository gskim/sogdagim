import { EntityRepository, PostCount, Repository } from '@sogdagim/orm'

@EntityRepository(PostCount)
export class PostCountRepository extends Repository<PostCount> {

}
