import 'cross-fetch/polyfill'
import 'reflect-metadata'

import { plainToClass } from 'class-transformer'
import FormData from 'form-data'
import _ from 'lodash'
import qs from 'qs'

import { HttpClientProvider, RequestConfig } from './lib/HttpClientProvider'
import { InterceptorError, InterceptorManager } from './lib/InterceptorManager'
import { GlobalAPIConfig } from './GlobalAPIConfig'

export abstract class BaseAPI {
	protected static ENV_KEY: string
	protected static defaultEndpoint: string

	userToken?: string | null
	endpoint?: string
	interceptors = new InterceptorManager()

	private readonly provider = new HttpClientProvider()

	constructor(options?: APIOptions) {
		const ENV_KEYS: { [key: string]: string | undefined } = {
			API_HOST: process.env.API_HOST
		}
		const ENV_KEY = (this.constructor as typeof BaseAPI).ENV_KEY

		const candidates = [options && options.endpoint, ENV_KEY && ENV_KEYS[ENV_KEY], (this.constructor as typeof BaseAPI).defaultEndpoint]
		this.endpoint = candidates.find((v) => !!v)

		if (!this.endpoint) throw new Error("'endpoint' is required")
	}

	protected async get<T>(path: string, request: T, requestClass: new () => T, endpoint?: string) {
		return await this.fetch('GET', path, request, requestClass, endpoint)
	}

	protected async post<T>(path: string, request: T, requestClass: new () => T, endpoint?: string, files?: any) {
		return await this.fetch('POST', path, request, requestClass, endpoint, files)
	}

	protected async put<T>(path: string, request: T, requestClass: new () => T, endpoint?: string, files?: any) {
		return await this.fetch('PUT', path, request, requestClass, endpoint, files)
	}

	protected async delete<T>(path: string, request: T, requestClass: new () => T, endpoint?: string, files?: any) {
		return await this.fetch('DELETE', path, request, requestClass, endpoint, files)
	}

	private async fetch<T>(method: string, path: string, request: T, requestClass: new () => T, endpoint?: string, files?: any) {
		request = plainToClass(requestClass, request)

		let _url = `${endpoint || this.endpoint}${path}`

		const pathParams = this.getPathParams(request)
		if (!_.isEmpty(pathParams)) {
			for (const sortedKey of _.sortBy(Object.keys(pathParams), (key: string) => key.length).reverse()) {
				_url = _url.replace(`:${sortedKey}`, pathParams[sortedKey])
			}
		}

		const queryParams = this.getQueryParams(request)
		if (!_.isEmpty(queryParams)) _url += `?${qs.stringify(queryParams, { sort: (a, b) => a.localeCompare(b) })}`

		const apiCacheConfig = this.getApiCacheConfig(request)

		const config: any = {
			url: _url,
			method: method,
			headers: {},
			...apiCacheConfig
		}

		if (files) {
			if (!files.length) files = [files]
			const data = new FormData()
			for (const file of files) {
				data.append('files', file)
			}
			const body = this.getBodys(request)
			if (!_.isEmpty(body)) {
				_.mapKeys(body, async (value, key) => {
					data.append(key, `${value}`)
				})
			}
			config.data = data
		} else {
			const body = this.getBodys(request)
			if (!_.isEmpty(body)) {
				config.headers['Content-Type'] = 'application/json'
				config.data = JSON.stringify(body)
			}
		}
		const headers = this.getHeaders(request)
		config.headers = { ...config.headers, ...headers }

		if (this.userToken) {
			config.headers.Authorization = `Bearer ${this.userToken}`
		}

		if (files) {
			const result =  await fetch(_url, {
				method: 'post',
				body: config.data,
				headers: config.headers
			})

			return result.json()
		}
		return await this.request(config)
	}

	private getApiCacheConfig(request: any) {
		if (request.useApiCache) {
			return { cache: true }
		}
		return {}
	}

	private getPathParams(request: any) {
		const pathParams: any = {}
		for (const key of Object.keys(request)) {
			const metadata = Reflect.getMetadata('custom:annotation', request, key)
			if (metadata && metadata.type === 'path') {
				pathParams[key] = (request)[key]
			}
		}

		return pathParams
	}

	private getQueryParams(request: any) {
		const queryParams: any = {}
		for (const key of Object.keys(request)) {
			const metadata = Reflect.getMetadata('custom:annotation', request, key)
			if (metadata && metadata.type === 'query') {
				queryParams[key] = request[key]
			}
		}

		return queryParams
	}

	private getBodys(request: any) {
		const body: any = {}
		for (const key of Object.keys(request)) {
			const metadata = Reflect.getMetadata('custom:annotation', request, key)
			if (metadata && metadata.type === 'body') {
				body[key] = request[key]
			}
		}

		return body
	}

	private getHeaders(request: any) {
		const header: any = {}
		for (const key of Object.keys(request)) {
			const metadata = Reflect.getMetadata('custom:annotation', request, key)
			if (metadata && metadata.type === 'header') {
				if (metadata.headerName) header[metadata.headerName] = request[key]
				else header[key] = request[key]
			}
		}

		return header
	}

	private async request(config: RequestConfig) {
		let response
		try {
			response = await this.provider.request(config)
		} catch (e) {
			let error
			if(e.data && e.data.error) {
				const axiosError = e.data.error
				error = new InterceptorError(axiosError.code, axiosError.message, axiosError.message)
			} else {
				error = new InterceptorError(null, e.message, e.message)
			}
			await this.interceptors.interceptResponseError(error)
			await GlobalAPIConfig.interceptors.interceptResponseError(error)
			throw e
		}
		return response
	}
}

export interface APIOptions {
	endpoint?: string
}
