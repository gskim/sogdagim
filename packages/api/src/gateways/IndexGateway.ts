import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse
  } from '@nestjs/websockets'
  import { from, Observable } from 'rxjs'
  import { map } from 'rxjs/operators'
  import { Server, Socket } from 'socket.io'

  @WebSocketGateway()
  export class IndexGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server

	afterInit(server: Server) {
		console.log('afterinit')
	}

	handleDisconnect(client: Socket) {
		console.log('discon')
	}

	handleConnection(client: Socket, ...args: any[]) {
		console.log('con')
	}

	@SubscribeMessage('joinChat')
	joinChat(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
		client.join(data.chatId, (err) => {
			if (err) console.error(err)
		})
	}

	@SubscribeMessage('aa')
	findAll(@MessageBody() data: any, @ConnectedSocket() client: Socket): Observable<WsResponse<number>> {
		client.join('', (err) => {

		})
		client.to('aRoom').emit('roomCreated', { room: 'aRoom' })
		console.log(data)
		return from([1, 2, 3]).pipe(map((item) => ({ event: 'cc', data: item })))
	}

	@SubscribeMessage('bb')
	async identity(@MessageBody() data: number): Promise<number> {
		console.log('bb')
		console.log(data)
		return data
	}

	@SubscribeMessage('cc')
	cc(@MessageBody() data: number): WsResponse {
		console.log('cc')
		console.log(data)
		return { event: '', data: '' }
	}
}
