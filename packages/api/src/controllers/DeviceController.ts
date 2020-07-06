import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, Post, Put, SerializeOptions, UseInterceptors } from '@nestjs/common'
import { DeviceService } from '@services/DeviceService'
import { plainToClass } from '@sogdagim/model'
import {  } from '@sogdagim/model/models'

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
export class DeviceController {
	@Inject()
	private readonly deviceService: DeviceService
	@Post('/devices')
	async addDevice(@Body() params: any): Promise<any> {
		const result = await this.deviceService.upsertDevice(params)
		return {
			success: result ? true : false
		}
	}
}
