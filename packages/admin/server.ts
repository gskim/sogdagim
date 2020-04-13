import cookieParser from 'cookie-parser'
import express from 'express'
import { Request, Response } from 'express'
import next from 'next'
import * as path from 'path'
import * as url from 'url'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev: dev })
const handle = app.getRequestHandler()
const server = express()
server.disable('x-powered-by')
server.use(cookieParser())
const rootStaticFiles = ['/global.css']

app.prepare().then(() => {
	server.get('/healthcheck', (req: Request, res: Response) => {
		return res.send('ok')
	})
	rootStaticFiles.forEach((v) => server.get(v, serveStatic))
	server.get('*', (req: any, res) => {
		handle(req, res)
	})
})

function serveStatic(req: Request, res: Response) {
	if (!req.url) return

	const parsedUrl = url.parse(req.url, true)
	if (parsedUrl.pathname && rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
		const _path = path.join(__dirname, 'static', parsedUrl.pathname)
		app.serveStatic(req, res, _path)
	}
}

export default server
