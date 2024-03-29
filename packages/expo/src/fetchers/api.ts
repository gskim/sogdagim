import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { AsyncStorage } from 'react-native'
import getEnvVars from '../environment'
const { apiUrl } = getEnvVars()

export default class Api {
	private readonly axiosInstance: AxiosInstance

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: `${apiUrl}`
		})
	}

	protected async get<T, I>(url: string, params: T, isPublic: boolean = false): Promise<I> {
		const config: any = {
			url,
			method: 'get',
			params
		}

		return await this.request(config, isPublic)
	}

	protected async post<T, I>(url: string, data: T, isPublic: boolean = false): Promise<I> {
		const config: any = {
			url,
			method: 'post',
			data
		}

		return await this.request(config, isPublic)
	}

	protected async put<T, I>(url: string, data: T, isPublic: boolean = false): Promise<I> {
		const config: any = {
			url,
			method: 'put',
			data
		}

		return await this.request(config, isPublic)
	}

	protected async delete<T, I>(url: string, params: T, isPublic: boolean = false): Promise<I> {
		const config: any = {
			url,
			method: 'delete',
			params
		}

		return await this.request(config, isPublic)
	}

	protected async getToken() {
		const userToken = await AsyncStorage.getItem('userToken')
		const token = `Bearer ${userToken}`
		return token
	}

	private async request(config: RequestConfig, isPublic: boolean = false): Promise<Response> {
		try {
			if (!isPublic) {
				config.headers = {
					Authorization: this.getToken()
				}
			}

			const response = await this.axiosInstance.request(config)
			return response.data
		} catch (e) {
			console.log(e)
			if (e.response.status === 401) {
				await AsyncStorage.setItem('userToken', '')
			} else {
				// error 처리...
			}
		}
	}
}

export type RequestConfig = AxiosRequestConfig
export type Response = any
