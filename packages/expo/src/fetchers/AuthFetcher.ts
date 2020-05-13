import { AsyncStorage } from 'react-native'
import Api from './api'

export default class AuthFetcher extends Api {
	async login(loginParams: LoginParams) {
		const url = `/auths/login`
		const { accessToken = '' } = await this.post(url, loginParams, true) || {}
		return accessToken
	}

	async logout() {
		await AsyncStorage.setItem('userToken', '')
	}
}

export interface LoginParams {
	email: string
	password: string
}
