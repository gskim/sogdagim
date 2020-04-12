import { Controller, Get, Inject } from '@nestjs/common'
import { IndexService } from '@services/IndexService'

@Controller()
export class IndexController {

	@Inject()
	private readonly indexService: IndexService

	@Get('/health')
	health() {
		return this.indexService.getHello()
	}
}
