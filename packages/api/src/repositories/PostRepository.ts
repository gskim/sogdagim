import { EntityRepository, Post, Repository } from '@sogdagim/orm'

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
	async getPosts() {
		return this.find()
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
