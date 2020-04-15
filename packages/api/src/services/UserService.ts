import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '@repositories/UserRepository'
import { User } from '@sogdagim/orm'

@Injectable()
export class UserService {

	@InjectRepository(User) private readonly userRepository: UserRepository
	async getUsers() {
		return await this.userRepository.getUsers()
	}
}
