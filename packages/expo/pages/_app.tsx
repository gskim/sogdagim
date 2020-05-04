import { AppContext, AppProps } from 'next/app'
import NextHead from 'next/head'
import React from 'react'

function MyApp ({ Component, pageProps }: AppProps) {
	return (

		<>
			<NextHead>
				<title>속닥임 어드민</title>
				<meta name='title' content='속닥임 어드민' />
				<meta name='description' content='속닥임 어드민' />
			</NextHead>
			<>
			<Component {...pageProps} />
			</>
		</>
	)
}

MyApp.getInitialProps = async ({ Component, ctx, router }: AppContext) => {
	let pageProps = {}

	if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx)
	return { pageProps }
}

export default MyApp
