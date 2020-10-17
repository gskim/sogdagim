import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class PointOrderSequence extends BaseEntity {
	@PrimaryGeneratedColumn() id: number
}
