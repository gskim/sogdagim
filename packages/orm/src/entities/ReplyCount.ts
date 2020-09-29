import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm'
import { Reply } from './Reply'

@Entity()
export class ReplyCount extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@OneToOne((type) => Reply)
	@JoinColumn()
	reply: Reply

	@Column({ type: 'int', default: 0 })
	likeCnt: number

	@Column({ type: 'int', default: 0 })
	replyCnt: number
}
