import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class MessageOrderSequence extends BaseEntity {
	@PrimaryGeneratedColumn() id: number
}
