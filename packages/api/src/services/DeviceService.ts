import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeviceRepository } from '@repositories/DeviceRepository'
import { UserRepository } from '@repositories/UserRepository'
import { plainToClass, Gender } from '@sogdagim/model'
import { Device, User } from '@sogdagim/orm'

@Injectable()
export class DeviceService {

	@InjectRepository(Device) private readonly deviceRepository: DeviceRepository

	async findDevice(uuid: string) {
		return await this.deviceRepository.findDeviceByUUID(uuid)
	}

	async upsertDevice(device: Device) {
		return await this.deviceRepository.saveDevice(plainToClass(Device, device))
	}
}
