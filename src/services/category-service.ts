import { CategoriesRepository } from '@/repositories/category-repository';

interface CategoryServiceParams {
	description: string
}

export class CategoryService {
	constructor(
		private categoryRepository: CategoriesRepository
	){}


	async execute({ description }: CategoryServiceParams) {
	
		const category = await this.categoryRepository.create({
			description
		})
		
		return category
	}
}
