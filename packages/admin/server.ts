import cookieParser from 'cookie-parser'
import express from 'express'
import { Request, Response } from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev: dev })
const handle = app.getRequestHandler()
const server = express()
server.disable('x-powered-by')
server.use(cookieParser())

app.prepare().then(() => {
	server.get('/healthcheck', (req: Request, res: Response) => {
		return res.send('ok')
	})
	server.get('*', (req: any, res) => {
		handle(req, res)
	})
})

export default server
