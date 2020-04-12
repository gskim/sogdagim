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
import { Chat } from './Chat'
import { User } from './User'

@Entity({
	orderBy: {
		orderId: 'ASC'
	}
})

export class Message extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'text' })
	text: string

	@Column({ type: 'boolean', default: false })
	isImage: boolean

	@Column({ type: 'boolean', default: false })
	isRead: boolean

	@Column({ type: 'boolean', default: false })
	sendSuccess: boolean

	@Index({ unique: true })
	@Column()
	orderId: number

	@ManyToOne((type) => Chat)
	chat: Chat

	@ManyToOne((type) => User)
	user: User

	@CreateDateColumn() createdAt: Date

	@UpdateDateColumn() updatedAt: Date
}
