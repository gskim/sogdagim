import { Response } from './HttpClientProvider'

export class InterceptorManager {
	private nextId = 0
	private readonly responseInterceptors = new Map<number, ResponseInterceptor>()
	private readonly responseErrorInterceptors = new Map<number, ErrorInterceptor>()

	addResponseInterceptor(interceptor: ResponseInterceptor) {
		const thisId = ++this.nextId
		this.responseInterceptors.set(thisId, interceptor)
		return thisId
	}

	addResponseErrorInterceptor(errorInterceptor: ErrorInterceptor) {
		const thisId = ++this.nextId
		this.responseErrorInterceptors.set(thisId, errorInterceptor)
		return thisId
	}

	removeResponseInterceptor(id: number) {
		return this.responseInterceptors.delete(id)
	}

	removeResponseErrorInterceptor(id: number) {
		return this.responseErrorInterceptors.delete(id)
	}

	async interceptResponse(response: Response) {
		let tempResult = response
		for (const interceptor of Array.from(this.responseInterceptors.values())) {
			tempResult = await interceptor(tempResult)
		}
		return tempResult
	}

	async interceptResponseError(error: InterceptorError) {
		for (const interceptor of Array.from(this.responseErrorInterceptors.values())) {
			// tslint:disable-next-line: await-promise
			await interceptor(error)
		}
	}
}

export type ResponseInterceptor = (response: Response) => Response | Promise<Response>
export type ErrorInterceptor = (e: InterceptorError) => (void)

export class InterceptorError extends Error {
	statusCode: number
	code: string

	constructor(statusCode?: number | null, code?: string, message?: string) {
		super(message)
		this.statusCode = statusCode || -1
		this.code = code || 'Unknown Error'
	}
}
