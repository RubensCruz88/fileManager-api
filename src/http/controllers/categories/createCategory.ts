import { FastifyRequest, FastifyReply} from 'fastify';
import { z } from "zod";
import { CreateCategoryService } from '@/services/categories/create-category-service';
import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';

export async function createCategory(request: FastifyRequest, reply: FastifyReply) {
	const categoryBodySchema = z.object({
		description: z.string()
	})

	const { description } = categoryBodySchema.parse(request.body)

	try{
		const prismaCategoriesRepository = new PrismaCategoriesRepository()
		const createCategoryService = new CreateCategoryService(prismaCategoriesRepository)
		const category = await createCategoryService.execute({
			description
		})

		return reply.status(200).send(category)
	} catch (err){
		return reply.status(400).send({message: err.message})
	}
}