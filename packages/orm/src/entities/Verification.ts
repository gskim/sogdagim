import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import {User} from './User'

@Entity()
export class Verification extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@OneToOne((type) => User)
	@JoinColumn()
	user: User

	@Column({ type: 'text' })
	key: string

	@Column({ type: 'boolean', default: false })
	verified: boolean

	@CreateDateColumn() createdAt: Date

	@UpdateDateColumn() updatedAt: Date

	@BeforeInsert()
	createKey(): void {
		this.key = Math.random()
				.toString(36)
				.substr(2)
	}
}
