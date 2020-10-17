import { PointType } from '@sogdagim/model'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	Index,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { User } from './User'

@Entity({
	orderBy: {
		orderId: 'ASC'
	}
})
export class Point extends BaseEntity {

	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'int', nullable: false })
	point: number

	@Column({ type: 'enum', enum: PointType, nullable: false })
	type: PointType

	@Index({ unique: true })
	@Column()
	orderId: number

	@ManyToOne((type) => User)
	user: User

	@CreateDateColumn() createdAt: Date

	@UpdateDateColumn() updatedAt: Date

}
