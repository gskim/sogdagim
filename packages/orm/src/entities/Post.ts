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
import Image from './Image'
import Like from './Like'
import PostMapping from './PostMapping'
import Unlike from './Unlike'
import User from './User'

@Entity({
	orderBy: {
		orderId: 'ASC'
	}
})
class Post extends BaseEntity {

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

	@ManyToOne((type) => Post, (post) => post.children)
	parent: Post

	@OneToMany((type) => Post, (post) => post.parent)
	children: Post[]

	@OneToMany((type) => Like, (like) => like.post)
	likes: Like[]

	@OneToMany((type) => Unlike, (unlike) => unlike.post)
	unlikes: Unlike[]

	@OneToMany((type) => PostMapping, (postMapping) => postMapping.parent)
	postMappings: PostMapping[]

	@CreateDateColumn() createdAt: Date

	@UpdateDateColumn() updatedAt: Date

}
export default Post
