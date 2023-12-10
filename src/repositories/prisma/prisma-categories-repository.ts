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

	async findByDescription(description: string) {
		const category = await prisma.category.findFirst({
			where: {
				description
			}
		})

		return category
	}

	async list() {
		const categories = await prisma.category.findMany()
		
		return categories
	}

	async findById(id: number) {
		const category = await prisma.category.findUnique({
			where: {
				id
			}
		})

		return category
	}
}
