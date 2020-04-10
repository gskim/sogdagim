import { BaseModel } from '../../models'
import { APIOptions, BaseAPI } from '../BaseAPI'

export class Test extends BaseAPI {
	static ENV_KEY = 'API_HOST'
	static defaultEndpoint = 'https://coalition.zigbang.net'

	constructor(options?: APIOptions) {
		super(options)
	}

	async getTestRequest(request: any): Promise<BaseModel<any, string>> {
		const endpoint = this.endpoint || Test.defaultEndpoint
		const path = `/test`
		return await this.get(path, request, BaseModel, endpoint)
	}

}
