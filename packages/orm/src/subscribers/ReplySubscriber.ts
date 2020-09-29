import { plainToClass } from '@sogdagim/model'
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm'
import { Reply, ReplyCount } from '../entities'

@EventSubscriber()
export class ReplySubscriber implements EntitySubscriberInterface<Reply> {

	listenTo() {
		return Reply
	}

	async afterInsert(event: InsertEvent<Reply>) {
		const replyCountRepository = event.manager.getRepository(ReplyCount)
		await replyCountRepository.insert(plainToClass(ReplyCount, { reply: event.entity }))
	}

}
