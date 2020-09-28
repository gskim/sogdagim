import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class ReplyOrderSequence extends BaseEntity {
	@PrimaryGeneratedColumn() id: number
}
