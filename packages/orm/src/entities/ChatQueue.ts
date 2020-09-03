import { ChatQueueData, ChatQueueType } from '@sogdagim/model/models'
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinTable,
	ManyToMany,
	OneToMany,
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

	@Column('json')
	data: ChatQueueData

	@CreateDateColumn() createdAt: Date
	@UpdateDateColumn() updatedAt: Date
}
