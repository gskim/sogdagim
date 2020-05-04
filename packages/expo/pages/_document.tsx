// import { getInitialProps } from '@expo/next-adapter/document'
import Document, { DocumentContext, Head, Main, NextScript } from 'next/document'
import * as React from 'react'
// @ts-ignore
import { AppRegistry } from 'react-native-web'

import { ServerStyleSheet } from 'styled-components'

const normalizeNextElements = `
/**
 * Building on the RNWeb reset:
 * https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/StyleSheet/initialRules.js
 */
html, body, #__next {
  width: 100%;
  /* To smooth any scrolling behavior */
  -webkit-overflow-scrolling: touch;
  margin: 0px;
  padding: 0px;
  /* Allows content to fill the viewport and go beyond the bottom */
  min-height: 100%;
}
#__next {
  flex-shrink: 0;
  flex-basis: auto;
  flex-direction: column;
  flex-grow: 1;
  display: flex;
  flex: 1;
}
html {
  scroll-behavior: smooth;
  /* Prevent text size change on orientation change https://gist.github.com/tfausak/2222823#file-ios-8-web-app-html-L138 */
  -webkit-text-size-adjust: 100%;
  height: 100%;
}
body {
  display: flex;
  /* Allows you to scroll below the viewport; default value is visible */
  overflow-y: auto;
  overscroll-behavior-y: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-overflow-style: scrollbar;
}
`

class CustomDocument extends Document {

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
		AppRegistry.registerComponent('Main', () => Main)
		const { getStyleElement } = AppRegistry.getApplication('Main')
		const pages = ctx.renderPage()
		const styles = [
		<style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
		getStyleElement()
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
		<html>
		<Head>
			<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
		</Head>
		<body>
			<Main />
			<NextScript />
		</body>
		</html>
	)
  }
}

export default CustomDocument
