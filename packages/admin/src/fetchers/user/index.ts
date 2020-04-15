import { CommonUser } from '@sogdagim/model/models/app'
import Api from '../api'

export default class User extends Api {
	async getUsers(): Promise<CommonUser[]> {
		const url = `/users`
		const res: CommonUser[] = await this.get(url, {}, true)
		return res
	}
}
