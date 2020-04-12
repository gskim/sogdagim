import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@Entity()
export class Unlike extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ default: true })
	status: boolean

	@ManyToOne((type) => User)
	user: User

	@ManyToOne((type) => Post)
	post: Post

	@CreateDateColumn() createdAt: Date

	@UpdateDateColumn() updatedAt: Date

}
