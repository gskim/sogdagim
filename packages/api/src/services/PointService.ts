import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LikeRepository } from '@repositories/LikeRepository'
import { PointOrderSequenceRepository } from '@repositories/PointOrderSequenceRepository'
import { PointRepository } from '@repositories/PointRepository'
import { PostRepository } from '@repositories/PostRepository'
import { UserRepository } from '@repositories/UserRepository'
import { Like, Point, PointOrderSequence, Post, User } from '@sogdagim/orm'

@Injectable()
export class PointService {

	@InjectRepository(Post) private readonly postRepository: PostRepository
	@InjectRepository(User) private readonly userRepository: UserRepository
	@InjectRepository(Point) private readonly pointRepository: PointRepository
	@InjectRepository(PointOrderSequence) private readonly pointOrderSequenceRepository: PointOrderSequenceRepository

	async pointUp(user: User, amount: number) {
		const pointOrder = await this.pointOrderSequenceRepository.create().save()
		const point = await this.pointRepository.up(user, amount, pointOrder.id * -1)
		await this.userRepository.increment({ id: user.id }, 'point', amount)
		return true
	}
	async pointDown(user: User, amount: number) {
		const pointOrder = await this.pointOrderSequenceRepository.create().save()
		const point = await this.pointRepository.down(user, amount, pointOrder.id * -1)
		await this.userRepository.decrement({ id: user.id }, 'point', amount)
		return true
	}
}
