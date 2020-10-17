import { EntityRepository, PointOrderSequence, Repository } from '@sogdagim/orm'

@EntityRepository(PointOrderSequence)
export class PointOrderSequenceRepository extends Repository<PointOrderSequence> {
}
