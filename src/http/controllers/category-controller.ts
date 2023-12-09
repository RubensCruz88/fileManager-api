import { FastifyRequest, FastifyReply} from 'fastify';
import { z } from "zod";
import { CategoryService } from '@/services/category-service';
import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';

export async function category(request: FastifyRequest, reply: FastifyReply) {
	const categoryBodySchema = z.object({
		description: z.string()
	})

	const { description } = categoryBodySchema.parse(request.body)

	try{
		const prismaCategoriesRepository = new PrismaCategoriesRepository()
		const categoryService = new CategoryService(prismaCategoriesRepository)
		const category = await categoryService.execute({
			description
		})

		return reply.status(200).send(category)
	} catch (err){
		return reply.status(500).send()
	}
}