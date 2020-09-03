import { ChatQueue, ChatQueueType, EntityRepository, Repository } from '@sogdagim/orm'
import { Socket } from 'socket.io'

@EntityRepository(ChatQueue)
export class ChatQueueRepository extends Repository<ChatQueue> {
	async findQueue() {
		return await this.findOne({
			where: {
				type: ChatQueueType.READY
			},
			order: {
				id: 'ASC'
			},
			lock: { mode: 'pessimistic_read' }
		})
	}

	async addQueue(userId: number, socketId: string) {
		console.log('addQueue')
		const queue = this.create()
		queue.type = ChatQueueType.READY
		queue.userId = userId
		queue.socketId = socketId
		return await this.save(queue)
	}

	async initQueue(userId: number) {

	}

}
