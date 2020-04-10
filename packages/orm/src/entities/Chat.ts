import { ChatType } from '@sogdagim/model/models'
import * as passwordHash from 'password-hash'
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import Message from './Message'
import User from './User'

@Entity()
class Chat extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ nullable: true })
	name?: string

	@Column({ nullable: true })
	description?: string

	@Column({ default: 2 })
	maxPersons: number

	@Column({ nullable: true })
	password?: string

	@Column({ type: 'enum', enum: ChatType, default: ChatType.RANDOM })
	type: ChatType

	@ManyToMany((type) => User, (user) => user.chats)
	@JoinTable()
	users: User[]

	@OneToMany((type) => Message, (message) => message.id)
	messages: Message[]

	@CreateDateColumn() createdAt: Date

	@UpdateDateColumn() updatedAt: Date

	comparePassword(password: string): boolean {
		if (this.password) {
			return passwordHash.verify(password, this.password)
		}
		return false
	}

	@BeforeInsert()
	savePassword(): void {
		if (this.password && this.type === ChatType.PRIVATE) {
			const hashedPassword = this.hashPassword(this.password)
			this.password = hashedPassword
		}
	}

	private hashPassword(password: string): string {
		return passwordHash.generate(password)
	}
}
export default Chat
