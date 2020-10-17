import { EntityRepository, Point, PointType, Repository, User } from '@sogdagim/orm'

@EntityRepository(Point)
export class PointRepository extends Repository<Point> {
	async up(user: User, point: number, orderId: number) {
		return await this.create({
			type: PointType.In,
			user: user,
			point: point,
			orderId: orderId
		}).save()
	}
	async down(user: User, point: number, orderId: number) {
		return await this.create({
			type: PointType.Out,
			user: user,
			point: point,
			orderId: orderId
		}).save()
	}
}
