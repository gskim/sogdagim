import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { User } from './User'

@Entity()
export class Device extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'boolean' })
	isDevice: boolean

	@Column({ type: 'varchar', length: 20, nullable: true })
	brand: string | null

	@Column({ type: 'varchar', length: 20, nullable: true })
	manufacturer: string | null

	@Column({ type: 'varchar', length: 20, nullable: true })
	modelName: string | null

	// IOS only
	@Column({ type: 'varchar', length: 20, nullable: true })
	modelId: string | null

	// AND only
	@Column({ type: 'varchar', length: 20, nullable: true })
	designName: string | null

	// AND only
	@Column({ type: 'varchar', length: 20, nullable: true })
	productName: string | null

	@Column({ type: 'varchar', length: 20, nullable: true })
	deviceYearClass: string | null

	@Column({ type: 'varchar', length: 50, nullable: true })
	supportedCpuArchitectures: string | null

	@Column({ type: 'varchar', length: 20, nullable: false })
	osName: string

	@Column({ type: 'varchar', length: 20, nullable: false })
	osVersion: string

	@Column({ type: 'varchar', length: 20, nullable: true })
	osBuildId: string | null

	@Column({ type: 'varchar', length: 20, nullable: true })
	osInternalBuildId: string | null

	// AND only
	@Column({ type: 'varchar', length: 300, nullable: true })
	osBuildFingerprint: string | null

	// AND only
	@Column({ type: 'int', nullable: true })
	platformApiLevel: number | null

	@Column({ type: 'varchar', length: 100,  nullable: true })
	deviceName: string | null

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@ManyToOne((type) => User)
	user: User

}
