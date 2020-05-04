import { AppContext, AppProps } from 'next/app'
import NextHead from 'next/head'
import React, { useState } from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import styled from 'styled-components'
const MyApp = ({ Component, pageProps }: AppProps) => {
	const theme = {
		...DefaultTheme,
		dark: true,
		roundness: 2,
		colors: {
		  ...DefaultTheme.colors,
		  primary: '#3498db',
		  accent: '#f1c40f'
		}
	  }
	return (

		<>
			<NextHead>
				<title>속닥임 앱</title>
				<meta name='title' content='속닥임 앱' />
				<meta name='description' content='속닥임 앱' />
			</NextHead>
			<PaperProvider theme={theme}>
			<Component {...pageProps} />
			</PaperProvider>
		</>
	)
}

MyApp.getInitialProps = async ({ Component, ctx, router }: AppContext) => {
	let pageProps = {}

	if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx)
	return { pageProps }
}

export default MyApp

const Test = styled.div``
