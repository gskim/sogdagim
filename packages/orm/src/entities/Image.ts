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

@Entity()
export class Image extends BaseEntity {

	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'text', nullable: false })
	key: string

	@Column({ type: 'text', nullable: true })
	originalName: string

	@Column({ type: 'varchar', length: 10 })
	mimetype: string

	@Column({ type: 'int' })
	size: number

	@ManyToOne((type) => Post)
	post: Post

	@CreateDateColumn() createdAt: Date

	@UpdateDateColumn() updatedAt: Date

}
