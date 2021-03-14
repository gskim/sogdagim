import cookie from 'js-cookie'
import nextCookie from 'next-cookies'
import Router from 'next/router'
import Api from '../api'

export default class AuthFetcher extends Api {
	async login(loginParams: LoginParams) {
		const url = `/auths/login`
		const { accessToken = '' } = await this.post(url, loginParams, true) || {}

		if (accessToken) {
			cookie.set('token', accessToken)
			Router.push('/')
		}
	}

	async logout() {
		cookie.remove('token')
		Router.push('/login')
	}

	async googleLogin(data: any) {
		const url = `/auths/google`
		const { accessToken = '' } = await this.get(url, { ...data, idToken: 'idToken'}, true) || {}
		if (accessToken) {
			cookie.set('token', accessToken)
			Router.push('/')
		}
	}

	isAuth(ctx) {
		const { token } = nextCookie(ctx)
		return !!token
	}

	auth(ctx) {
		if (!this.isAuth(ctx)) {
			if (typeof window === 'undefined') {
				ctx.res.writeHead(302, { Location: '/login' })
				ctx.res.end()
			} else {
				Router.push('/login')
			}
		}
	}
}

export interface LoginParams {
	email: string
	password: string
}
