import {
	BaseEntity,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique
} from 'typeorm'
import { Post } from './Post'

@Entity()
@Unique('parent_child', ['parent', 'child'])
export class PostMapping extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne((type) => Post, (post) => post.postMappings)
	parent: number

	@ManyToOne((type) => Post, (post) => post.postMappings)
	child: number

}
