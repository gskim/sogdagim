// import * as bcrypt from 'bcrypt'
import { Gender } from '@sogdagim/model/models'
import * as passwordHash from 'password-hash'
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Chat } from './Chat'
import { Device } from './Device'
import { Like } from './Like'
import { Post } from './Post'
import { Unlike } from './Unlike'

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'varchar', length: 30, nullable: true })
	nickname: string

	@Column({ type: 'text', nullable: true })
	email?: string

	@Column({ type: 'boolean', default: false })
	verified: boolean

	@Column({ type: 'enum', enum: Gender, nullable: true })
	gender?: Gender

	@Column({ type: 'int', nullable: true })
	birthYear?: number

	@Column({ type: 'int', nullable: true })
	birthMonth?: number

	@Column({ type: 'int', nullable: true })
	birthDay?: number

	@Column({ type: 'text', nullable: true })
	password?: string

	@Column({ type: 'text', nullable: true })
	profilePhoto?: string

	@Column({ type: 'float', default: 0, precision: 12 })
	lat: number

	@Column({ type: 'float', default: 0, precision: 12 })
	lon: number

	@Column({ type: 'int', nullable: true })
	snsId?: number

	@Column({ type: 'varchar', length: 10, nullable: true })
	snsType?: string

	@Column({ type: 'int', default: 0 })
	point: number

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@ManyToMany((type) => Chat, (chat) => chat.users)
	chats: Chat[]

	@ManyToMany((type) => User, (user) => user.following, { cascade: ['insert', 'update'] })
	@JoinTable()
	followers: User[]

	@ManyToMany((type) => User, (user) => user.followers, { cascade: ['insert', 'update'] })
	following: User[]

	@OneToMany((type) => Like, (like) => like.user)
	likes: Like[]

	@OneToMany((type) => Unlike, (unlike) => unlike.user)
	unlikes: Unlike[]

	@OneToMany((type) => Post, (post) => post.user)
	posts: Post[]

	@OneToMany((type) => Device, (device) => device.user)
	devices: Device[]

	comparePassword(password: string): boolean {
		if (this.password) {
			return passwordHash.verify(password, this.password)
		}
		return false
	}

	@BeforeInsert()
	// @BeforeUpdate()
	savePassword(): void {
		if (this.password) {
			const hashedPassword = this.hashPassword(this.password)
			this.password = hashedPassword
		}
	}

	private hashPassword(password: string): string {
		return passwordHash.generate(password)
	}
}