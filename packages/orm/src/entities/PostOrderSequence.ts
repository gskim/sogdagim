import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
class PostOrderSequence extends BaseEntity {
	@PrimaryGeneratedColumn() id: number
}
export default PostOrderSequence
