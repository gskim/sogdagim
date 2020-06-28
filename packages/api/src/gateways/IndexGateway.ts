import {
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

	@SubscribeMessage('aa')
	findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
		console.log(data)
		return from([1, 2, 3]).pipe(map((item) => ({ event: 'aa', data: item })))
	}

	@SubscribeMessage('bb')
	async identity(@MessageBody() data: number): Promise<number> {
		console.log('bb')
		console.log(data)
		return data
	}
}
