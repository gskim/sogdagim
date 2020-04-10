import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
class NotificationOrderSequence extends BaseEntity {
	@PrimaryGeneratedColumn() id: number
}
export default NotificationOrderSequence
