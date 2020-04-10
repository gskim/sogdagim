import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
class MessageOrderSequence extends BaseEntity {
	@PrimaryGeneratedColumn() id: number
}
export default MessageOrderSequence
