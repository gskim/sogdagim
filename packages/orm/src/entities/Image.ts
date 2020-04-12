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
	originalName: string

	@Column({ type: 'text', nullable: false })
	name: string

	@Column({ type: 'varchar', length: 10 })
	ext: string

	@Column({ type: 'int' })
	size: number

	@ManyToOne((type) => Post)
	post: Post

	@CreateDateColumn() createdAt: Date

	@UpdateDateColumn() updatedAt: Date

}
