import { SimpleUser } from '@sogdagim/model/models'
import { AppContext, LayoutType } from '@src/@types'
import GlobalStyle from '@src/assets/GlobalStyle'
import AppLayout from '@src/components/AppLayout'
import { MyInfoContext } from '@src/contexts/MyInfoContext'
import AuthFetcher from '@src/fetchers/auth'
import UserFetcher from '@src/fetchers/user'
import { AppProps } from 'next/app'
import NextHead from 'next/head'
import React, { useCallback } from 'react'
import 'reflect-metadata'
const userFetcher = new UserFetcher()
const authFetcher = new AuthFetcher()

import '@src/assets/css/antd.less'

function MyApp ({ Component, pageProps, layoutType, myInfo, router }: AppProps & {myInfo?: SimpleUser ,layoutType: LayoutType, isPublicPage?: boolean}) {
	const { asPath } = router
	const logout = useCallback(() => {
		console.log('logout')
	}, [])

	return (

		<>
			<NextHead>
				<title>속닥임 어드민</title>
				<meta name='title' content='속닥임 어드민' />
				<meta name='description' content='속닥임 어드민' />
			</NextHead>
			<GlobalStyle layoutType={layoutType}/>
			<MyInfoContext.Provider value={myInfo} >
				<AppLayout layoutType={layoutType} path={asPath} logout={logout} myInfo={myInfo} >
					<Component {...pageProps} />
				</AppLayout>
			</MyInfoContext.Provider>
		</>
	)
}

MyApp.myInfo = undefined

MyApp.getInitialProps = async ({ Component, ctx, router }: AppContext) => {
	const layoutType = Component.layoutType
	const isPublicPage = Component.isPublicPage

	let pageProps = {}

	if (!isPublicPage) {
		authFetcher.auth(ctx)
		userFetcher.setContext(ctx)

		if (ctx.req || !MyApp.myInfo) {
			const user = await userFetcher.getUserMe()
			MyApp.myInfo = user
		}

	}
	if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx)
	return { pageProps, layoutType, myInfo: MyApp.myInfo }
}

export default MyApp
