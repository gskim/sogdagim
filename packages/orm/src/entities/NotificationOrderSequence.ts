import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class NotificationOrderSequence extends BaseEntity {
	@PrimaryGeneratedColumn() id: number
}
