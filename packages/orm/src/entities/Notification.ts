import { NotificationType } from '@sogdagim/model/models'
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
import User from './User'

@Entity({
	orderBy: {
		orderId: 'ASC'
	}
})

class Notification extends BaseEntity {

	@PrimaryGeneratedColumn() id: number

	@Column()
	text: string

	@Column({ type: 'enum', enum: NotificationType })
	type: NotificationType

	@Column()
	targetId: number

	@ManyToOne((type) => User)
	sendUser: User

	@Column({ default: false })
	isRead: boolean

	@ManyToOne((type) => User)
	receiveUser: User

	@Index({ unique: true })
	@Column()
	orderId: number

	@CreateDateColumn() createdAt: Date

	@UpdateDateColumn() updatedAt: Date

}
export default Notification
