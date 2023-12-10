import { CategoriesRepository } from '@/repositories/category-repository';

export class ListCategoriesService {
	constructor(
		private categoryRepository: CategoriesRepository
	){}

	async execute() {
		const categories = await this.categoryRepository.list()

		return categories
	}
}
