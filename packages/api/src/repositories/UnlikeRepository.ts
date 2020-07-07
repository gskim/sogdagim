import { EntityRepository, Post, Repository, Unlike, User } from '@sogdagim/orm'

@EntityRepository(Unlike)
export class UnlikeRepository extends Repository<Unlike> {

	async findUnlike(post: Post, user: User) {
		return await this.findOneOrFail({
			where: {
				post: post,
				user: user
			}
		})
	}
}
