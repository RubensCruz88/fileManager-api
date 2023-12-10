import { CategoriesRepository } from '@/repositories/category-repository';

interface FindCategoryByIdServiceParams {
	id: number
}

export class FindCategoryByIdService {
	constructor(
		private categoryRepository: CategoriesRepository
	){}

	async execute({ id }: FindCategoryByIdServiceParams) {
		const category = await this.categoryRepository.findById(id)

		return category
	}
}
