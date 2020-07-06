import { Device, EntityRepository, Repository } from '@sogdagim/orm'

@EntityRepository(Device)
export class DeviceRepository extends Repository<Device> {
	async saveDevice(device: Device) {
		return await device.save()
	}
}
