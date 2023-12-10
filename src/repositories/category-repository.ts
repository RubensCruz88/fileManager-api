import { Prisma, Category } from '@prisma/client';

export interface CategoriesRepository {
	create(data: Prisma.CategoryCreateInput): Promise<Category>
	findById(id: number): Promise<Category | null>
	findByDescription(description: string): Promise<Category | null>
	list(): Promise<Category[]>
}