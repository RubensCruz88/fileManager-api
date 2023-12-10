import { FastifyRequest, FastifyReply} from 'fastify';
import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { ListCategoriesService } from '@/services/categories/list-categories-service';

export async function listCategories(request: FastifyRequest, reply: FastifyReply) {
	try{
		const prismaCategoriesRepository = new PrismaCategoriesRepository()
		const categoryService = new ListCategoriesService(prismaCategoriesRepository)
		const categories = await categoryService.execute()

		return reply.status(200).send(categories)
	} catch (err){
		return reply.status(400).send({message: err.message})
	}
}