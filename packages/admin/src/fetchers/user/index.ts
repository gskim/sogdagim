import { plainToClass } from '@sogdagim/model'
import { CommonUser, GetUsersResponse } from '@sogdagim/model/models/app'
import Api from '../api'

export default class User extends Api {
	async getUsers(): Promise<CommonUser[]> {
		const url = `/users`
		const res: GetUsersResponse = await this.get(url, {}, true)
		console.log('==================')
		console.log(res)
		return res.users
	}
}
