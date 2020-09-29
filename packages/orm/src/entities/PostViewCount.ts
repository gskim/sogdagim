import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm'
import { Post } from './Post'

@Entity()
export class PostViewCount extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@OneToOne((type) => Post)
	@JoinColumn()
	post: Post

	@Column({ type: 'int', default: 0 })
	cnt: number
}
