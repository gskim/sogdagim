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
export class PostCount extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@OneToOne((type) => Post)
	@JoinColumn()
	post: Post

	@Column({ type: 'int', default: 0 })
	viewCnt: number

	@Column({ type: 'int', default: 0 })
	likeCnt: number

	@Column({ type: 'int', default: 0 })
	replyCnt: number
}
