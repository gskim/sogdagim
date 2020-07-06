import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeviceRepository } from '@repositories/DeviceRepository'
import { UserRepository } from '@repositories/UserRepository'
import { Gender, plainToClass } from '@sogdagim/model'
import { Device, User } from '@sogdagim/orm'

@Injectable()
export class DeviceService {

	@InjectRepository(Device) private readonly deviceRepository: DeviceRepository

	async upsertDevice(device: Device) {
		console.log(device)

		return await this.deviceRepository.saveDevice(plainToClass(Device, device))
	}
}
