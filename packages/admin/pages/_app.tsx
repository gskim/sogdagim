import { AppContext } from '@src/@types'
import GlobalStyle from '@src/assets/GlobalStyle'
import AppLayout from '@src/components/AppLayout'
import { MyInfoContext } from '@src/contexts/MyInfoContext'
import AuthFetcher from '@src/fetchers/auth'
import UserFetcher from '@src/fetchers/user'
import NextHead from 'next/head'
import React, { useCallback } from 'react'
import 'reflect-metadata'
const userFetcher = new UserFetcher()
const authFetcher = new AuthFetcher()

function MyApp({ Component, pageProps, layoutType, myInfo, router }) {
	const { asPath } = router
	const logout = useCallback(() => {

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
				<AppLayout layoutType={layoutType} path={asPath} logout={logout} >
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
