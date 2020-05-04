import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import cookie from 'js-cookie'
import { NextPageContext } from 'next'
import nextCookie from 'next-cookies'

export default class Api {
	private readonly axiosInstance: AxiosInstance
	private context: NextPageContext

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: `${process.env.API_HOST}`
		})
	}

	setContext(context: NextPageContext) {
		this.context = context
	}

	protected async get<T>(url: string, params: T, isPublic: boolean = false) {
		const config: any = {
			url,
			method: 'get',
			params
		}

		return await this.request(config, isPublic)
	}

	protected async post<T>(url: string, data: T, isPublic: boolean = false) {
		const config: any = {
			url,
			method: 'post',
			data
		}

		return await this.request(config, isPublic)
	}

	protected async put<T>(url: string, data: T, isPublic: boolean = false) {
		const config: any = {
			url,
			method: 'put',
			data
		}

		return await this.request(config, isPublic)
	}

	protected async delete<T>(url: string, isPublic: boolean = false) {
		const config: any = {
			url,
			method: 'delete'
		}

		return await this.request(config, isPublic)
	}

	protected getToken(isServer: boolean) {
		const token = `Bearer ${isServer ? nextCookie(this.context).token : cookie.get('token')}`
		return token
	}

	private async request(config: RequestConfig, isPublic: boolean = false): Promise<Response> {
		const isServer = (typeof window === 'undefined')
		console.log('isServier', isServer)
		try {
			if (!isPublic) {
				config.headers = {
					Authorization: this.getToken(isServer)
				}
			}

			const response = await this.axiosInstance.request(config)
			return response.data
		} catch (e) {
			console.log(e)
			if (e.response.status === 401) {
				if (isServer) {
					this.context.res!.writeHead(302, { Location: '/login' })
					this.context.res!.end()
				} else if (window) {
					cookie.remove('token')
					window.location.href = '/login'
				} else {
					console.error('http status 401 && window is undefined')
				}
			} else {
				if (isServer) {
					const message = (e.response.data && e.response.data.message) || `알수없는 오류입니다. \n ErrorCode: ${JSON.stringify(e)}`
					const url = require('url')
					// redirect error page로
					// @ts-ignore
					this.context.res!.redirect(url.format({
						pathname:'/error',
						query: { message }
					}))
				} else {
					if (e.response.data && e.response.data.message) {
						console.error(e.response.data.message)
						// toast띄우기
					} else {
						console.error(JSON.stringify(e))
						// toast띄우기
					}
				}
			}
		}
	}
}

export type RequestConfig = AxiosRequestConfig
export type Response = any