import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '@repositories/UserRepository'
import { SignUpType } from '@sogdagim/model'
import { User } from '@sogdagim/orm'
import Crypto from '@utils//Crypto'

@Injectable()
export class UserService {

	private readonly PASSWORD: string = 'asdfg12345'
	@InjectRepository(User) private readonly userRepository: UserRepository

	async signUpByEmail(email: string, password: string) {
		const existUser = await this.userRepository.findOne({ email: email })
		if (existUser) throw new BadRequestException('동일한 이메일이 존재합니다.')
		const user = this.userRepository.create()
		user.email = email
		user.nickname = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
		user.password = Crypto.SHA256(password)
		return await user.save()
	}

	async getUsers() {
		return await this.userRepository.getUsers()
	}

	async getUser(id: number) {
		return await this.userRepository.findOneOrFail(id)
	}

	async modifyUser(id: number, nickname: string) {
		const user = await this.getUser(id)
		user.nickname = nickname
		return await user.save()
	}

	async findByEmail(email: string) {
		return await this.userRepository.findOneOrFail({ where: { email: email } })
	}

	async findSnsUser(email: string, oauthId: string, signUpType: SignUpType) {
		return await this.userRepository.findOne({ where: { email: email, oauthId: oauthId, signUpType: signUpType } })
	}

	async addUser(email: string) {
		const existUser = await this.userRepository.findOne({ email: email })
		if (existUser) throw new BadRequestException('동일한 이메일이 존재합니다.')
		const user = this.userRepository.create()
		user.email = email
		user.nickname = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
		user.password = Crypto.SHA256(this.PASSWORD)
		return await this.userRepository.save(user)
	}

	async addSnsUser(email: string, oauthId: string, signUpType: SignUpType) {
		const user = this.userRepository.create()
		user.email = email
		user.oauthId = oauthId
		user.signUpType = signUpType
		user.nickname = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
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
