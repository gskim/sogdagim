import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

const normalizeNextElements = `
	#__next {
		display: flex;
		flex-direction: column;
	}
`

class MyDocument extends Document {

	static async getInitialProps(ctx: DocumentContext) {
	const sheet = new ServerStyleSheet()
	const originalRenderPage = ctx.renderPage
	try {
		ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (pageProps) =>
						sheet.collectStyles(
							<App {...pageProps} />
						),
					enhanceComponent: (Component) => Component
				})
		const initialProps = await Document.getInitialProps(ctx)
		const pages = ctx.renderPage()
		const styles = [
			<style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />
		]
		const props = {
			...initialProps,
			...pages,
			styles: (
				<>
					{React.Children.toArray(styles)}
					{initialProps.styles}
					{sheet.getStyleElement()}
				</>
			)
		}
		return props
	} finally {
		sheet.seal()
	}
	}

	render() {
		return (
			<Html>
			<Head>
				<meta name='viewport' content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' />
				<style>
				@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
				</style>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
			</Html>
		)
	}
}

export default MyDocument
