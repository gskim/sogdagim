import { PostStatus, ReplyStatus } from '@sogdagim/model/models'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Like } from './Like'
import { Post } from './Post'
import { User } from './User'

@Entity({
	orderBy: {
		orderId: 'ASC'
	}
})
export class Reply extends BaseEntity {

	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'text', nullable: false })
	text: string

	@Column({ type: 'enum', enum: ReplyStatus, default: ReplyStatus.PUBLIC })
	status: ReplyStatus

	@Index({ unique: true })
	@Column()
	orderId: number

	@ManyToOne((type) => User)
	user: User

	@ManyToOne((type) => Post, (post) => post.replies)
	post: Post

	@ManyToOne((type) => Reply, (reply) => reply.children)
	parent: Reply

	@OneToMany((type) => Reply, (reply) => reply.parent)
	children: Reply[]

	@OneToMany((type) => Like, (like) => like.post)
	likes: Like[]

	@CreateDateColumn() createdAt: Date

	@UpdateDateColumn() updatedAt: Date

}
