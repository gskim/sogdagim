import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, Post, Put, SerializeOptions, UseInterceptors } from '@nestjs/common'
import { DeviceService } from '@services/DeviceService'
import { plainToClass, PostDevicesRequest, PostDevicesResponse } from '@sogdagim/model'
import { Device } from '@sogdagim/orm'

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
export class DeviceController {
	@Inject()
	private readonly deviceService: DeviceService
	@Post('/devices')
	async addDevice(@Body() params: PostDevicesRequest): Promise<PostDevicesResponse> {
		const device = await this.deviceService.findDevice(params.uuid)
		const result = await this.deviceService.upsertDevice(device ? plainToClass(Device, { ...device, ...params }) : plainToClass(Device, params))
		return {
			success: result ? true : false
		}
	}
}
