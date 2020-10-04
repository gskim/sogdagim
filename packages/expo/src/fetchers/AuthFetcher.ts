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

	async googleLogin(token: string) {
		const url = `/auths/google`
		const { accessToken = '' } = await this.get(url, { code: 'code', idToken: token }, true) || {}
		return accessToken
	}

	async appleLogin(idToken: string) {
		const url = `/auths/apple`
		const { accessToken = '' } = await this.post(url, { code: 'code', idToken }, true) || {}
		return accessToken
	}
}

export interface LoginParams {
	email: string
	password: string
}
