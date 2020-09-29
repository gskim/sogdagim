import { plainToClass } from '@sogdagim/model'
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm'
import { Post, PostCount } from '../entities'

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Post> {

	listenTo() {
		return Post
	}

	async afterInsert(event: InsertEvent<Post>) {
		const postCountRepository = event.manager.getRepository(PostCount)
		await postCountRepository.insert(plainToClass(PostCount, { post: event.entity }))
	}

}
