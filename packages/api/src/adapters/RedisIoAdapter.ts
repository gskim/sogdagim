import { IoAdapter } from '@nestjs/platform-socket.io'
import { ServerOptions } from 'socket.io'
import redisIoAdaper from 'socket.io-redis'

const redisAdapter = redisIoAdaper({ host: process.env.REDIS_HOST, port: 6379 })

export class RedisIoAdapter extends IoAdapter {
	createIOServer(port: number, options?: ServerOptions): any {
		const server = super.createIOServer(port, options)
		server.adapter(redisAdapter)
		return server
	}
}
