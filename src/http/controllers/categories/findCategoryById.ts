import { FastifyRequest, FastifyReply} from 'fastify';
import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { z } from 'zod';
import { FindCategoryByIdService } from '@/services/categories/find-category-by-id-service';

export async function findCategoryById(request: FastifyRequest, reply: FastifyReply) {
	const categoryBodySchema = z.object({
		id: z.coerce.number()
	})

	const { id } = categoryBodySchema.parse(request.params)

	try{
		const prismaCategoriesRepository = new PrismaCategoriesRepository()
		const findCategoryByIdService = new FindCategoryByIdService(prismaCategoriesRepository)
		const category = await findCategoryByIdService.execute({id})

		return reply.status(200).send(category)
	} catch (err){
		return reply.status(400).send({message: err.message})
	}
}