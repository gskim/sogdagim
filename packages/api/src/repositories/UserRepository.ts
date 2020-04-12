import { EntityRepository, Repository, User } from '@sogdagim/orm'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async getUsers() {
		return this.find()
	}
}
