import { Controller, Get } from '@nestjs/common'

@Controller()
export class IndexController {

	@Get('/health')
	async health() {
		return 'ok'
	}
}
