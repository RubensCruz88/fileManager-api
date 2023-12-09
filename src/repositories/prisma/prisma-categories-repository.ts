import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client';
import { CategoriesRepository } from "../category-repository";

export class PrismaCategoriesRepository implements CategoriesRepository {
	async create(data: Prisma.CategoryCreateInput) {
		const category = await prisma.category.create({
			data
		})

		return category
	}
}
