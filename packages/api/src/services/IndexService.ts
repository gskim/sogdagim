import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '@repositories/UserRepository'
import { User } from '@sogdagim/orm'

@Injectable()
export class IndexService {

	@InjectRepository(User) private readonly userRepository: UserRepository
	async getHello() {
		return await this.userRepository.getUsers()
	}
}
