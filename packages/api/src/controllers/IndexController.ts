import { Controller, Get, Inject } from '@nestjs/common'
import { ConfigService } from '@services/ConfigService'
import { S3Service } from '@services/S3Service'
import moment from 'moment-timezone'
@Controller()
export class IndexController {

	@Inject()
	private readonly s3Sevice: S3Service

	@Inject()
	private readonly configSevice: ConfigService

	@Get('/health')
	async health() {
		return 'ok'
	}

	@Get('/time_zone')
	async timeZone() {
		return {
			date: new Date(),
			moment: moment().format('YYYY-MM-DD hh:mm:ss')
		}
	}

	@Get('/s3')
	async s3Test() {
		return await this.s3Sevice.getObject(this.configSevice.getString('APPLE_AUTH_KEY'))
	}
}
