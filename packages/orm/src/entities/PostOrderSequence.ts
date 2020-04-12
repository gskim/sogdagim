import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class PostOrderSequence extends BaseEntity {
	@PrimaryGeneratedColumn() id: number
}
