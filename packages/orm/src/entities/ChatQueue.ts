import { ChatQueueType } from '@sogdagim/model/models'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity()
export class ChatQueue extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'enum', enum: ChatQueueType, default: ChatQueueType.READY })
	type: ChatQueueType

	@Index()
	@Column({ type: 'int', nullable: false })
	userId: number

	@Column({ type: 'varchar', nullable: false })
	socketId: string

	@CreateDateColumn() createdAt: Date
	@UpdateDateColumn() updatedAt: Date
}
