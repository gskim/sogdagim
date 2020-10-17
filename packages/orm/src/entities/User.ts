// import * as bcrypt from 'bcrypt'
import { Gender, SignUpType } from '@sogdagim/model/models'
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
import { Point } from './Point'
import { Post } from './Post'
import { Reply } from './Reply'

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'varchar', length: 30, comment: '닉네임' })
	nickname: string

	@Column({ type: 'varchar', length: 200 })
	email: string

	@Column({ type: 'enum', enum: SignUpType, default: SignUpType.Email })
	signUpType: SignUpType

	@Column('varchar', { length: 100, nullable: true, comment: '로그인시 업데이트되는 토큰' })
	accessToken: string | null

	@Column({ type: 'enum', enum: Gender, default: Gender.Man })
	gender: Gender

	@Column({ type: 'varchar', nullable: true, length: 4 })
	birthYear?: string

	@Column({ type: 'varchar', nullable: true, length: 2 })
	birthMonth?: string

	@Column({ type: 'varchar', nullable: true, length: 2 })
	birthDay?: string

	@Column({ type: 'varchar', nullable: true, length: 300 })
	password?: string

	@Column({ type: 'text', nullable: true })
	profilePhoto?: string

	@Column({ type: 'float', default: 0, precision: 12 })
	lat: number

	@Column({ type: 'float', default: 0, precision: 12 })
	lon: number

	@Column({ type: 'int', default: 50 })
	point: number

	@Column({ type: 'varchar', nullable: true, length: 100 })
	oauthId?: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@ManyToMany((type) => Chat, (chat) => chat.users)
	chats: Chat[]

	@OneToMany((type) => Like, (like) => like.user)
	likes: Like[]

	@OneToMany((type) => Post, (post) => post.user)
	posts: Post[]

	@OneToMany((type) => Reply, (reply) => reply.user)
	replies: Reply[]

	@OneToMany((type) => Device, (device) => device.user)
	devices: Device[]

	@OneToMany((type) => Point, (point) => point.user)
	points: Point[]

	comparePassword(password: string): boolean {
		if (this.password) {
			return passwordHash.verify(password, this.password)
		}
		return false
	}

	@BeforeInsert()
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
