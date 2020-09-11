import { Controller, Get } from '@nestjs/common'
import moment from 'moment-timezone'
@Controller()
export class IndexController {

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
}
