import { PostStatus } from '@sogdagim/model/models'
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
import { Image } from './Image'
import { Like } from './Like'
import { Reply } from './Reply'
import { User } from './User'

@Entity({
	orderBy: {
		orderId: 'ASC'
	}
})
export class Post extends BaseEntity {

	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'varchar', nullable: true, length: 30 })
	title: string

	@Column({ type: 'text', nullable: false })
	text: string

	@Column({ type: 'enum', enum: PostStatus, default: PostStatus.PUBLIC })
	status: PostStatus

	@OneToMany((type) => Image, (image) => image.post)
	images: Image[]

	@Index({ unique: true })
	@Column()
	orderId: number

	@ManyToOne((type) => User)
	user: User

	@OneToMany((type) => Reply, (reply) => reply.post)
	replies: Reply[]

	@OneToMany((type) => Like, (like) => like.post)
	likes: Like[]

	@CreateDateColumn() createdAt: Date

	@UpdateDateColumn() updatedAt: Date

}
