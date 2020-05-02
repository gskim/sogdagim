import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '@repositories/UserRepository'
import { Gender } from '@sogdagim/model/models'
import { User } from '@sogdagim/orm'
import Crypto from '@utils//Crypto'

@Injectable()
export class UserService {

	private readonly PASSWORD: string = 'asdfg12345'

	@InjectRepository(User) private readonly userRepository: UserRepository

	async getUsers() {
		return await this.userRepository.getUsers()
	}

	async findByEmail(email: string) {
		return await this.userRepository.findOneOrFail({ where: { email: email } })
	}

	async addUser(email: string, nickname: string, birthYear: string, birthMonth: string, birthDay: string, gender: Gender) {
		const existUser = await this.userRepository.findOne({ email: email })
		if (existUser) throw new BadRequestException('동일한 이메일이 존재합니다.')
		const user = this.userRepository.create()
		user.email = email
		user.nickname = nickname
		user.birthYear = birthYear
		user.birthMonth = birthMonth
		user.birthDay = birthDay
		user.gender = gender
		user.password = Crypto.SHA256(this.PASSWORD)
		return await this.userRepository.save(user)
	}

	async updateLoginDateAndToken(user: User) {
		user.updatedAt = new Date()
		user.accessToken = Crypto.genToken()
		return await user.save()
	}

	async updateLogoutDateAndToken(user: User) {
		user.accessToken = null
		user.updatedAt = new Date()
		await user.save()
	}
}
