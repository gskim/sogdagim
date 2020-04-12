import { Test, TestingModule } from '@nestjs/testing'
import { IndexController } from './controllers/IndexController'
import { IndexService } from './services/IndexService'

describe('IndexController', () => {
  let app: TestingModule

  beforeAll(async () => {
	app = await Test.createTestingModule({
		controllers: [IndexController],
		providers: [IndexService]
	}).compile()
  })

  describe('getHello', () => {
	it('should return "Hello World!"', () => {
		const appController = app.get<IndexController>(IndexController)
		expect(appController.health()).toBe('Hello World!')
	})
  })
})
