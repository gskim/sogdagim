import { EntityRepository, MoreThan, Post, Repository } from '@sogdagim/orm'

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
	async getPosts(lastOrderId?: number) {

		return await this.find({
			relations: ['postCount'],
			where: {
				orderId: MoreThan(lastOrderId)
			},
			take: 20
		})
	}

	async getReplies(postId: number) {
		return this.createQueryBuilder('post')
		.leftJoinAndSelect('post.user', 'user')
		.leftJoinAndSelect('post.children', 'children')
		.leftJoinAndSelect('children.user', 'childrenUser')
		.where(`post.parent_id = ${postId}`)
		.getMany()
	}
}
