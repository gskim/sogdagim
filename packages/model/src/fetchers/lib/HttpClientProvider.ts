// tslint:disable-next-line:no-var-requires
import axios, { AxiosRequestConfig } from 'axios'

export class HttpClientProvider {
	private readonly provider = axios.create()

	async request(config: RequestConfig): Promise<Response> {
		try {
			const response = await this.provider(config)
			return response.data
		} catch (e) {
			console.log(e, 'error from http client request')
			if (e.response) throw e.response
			throw e
		}
	}
}

export type RequestConfig = AxiosRequestConfig
export type Response = any
