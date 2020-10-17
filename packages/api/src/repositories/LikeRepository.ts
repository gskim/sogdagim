import { EntityRepository, Like, Post, Repository, User } from '@sogdagim/orm'

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {

	async findLike(post: Post, user: User) {
		return await this.findOne({
			where: {
				post: post,
				user: user
			}
		})
	}
}
