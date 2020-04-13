import { Controller, Get, Inject } from '@nestjs/common'
import { IndexService } from '@services/IndexService'

@Controller()
export class IndexController {

	@Inject()
	private readonly indexService: IndexService

	@Get('/health')
	async health() {
		return await this.indexService.getHello()
	}

	@Get('/users')
	async users() {
		const users = await this.indexService.getHello()
		return users.map((user) => {
			return {
				nickname: user.nickname
			}
		})
	}
}
