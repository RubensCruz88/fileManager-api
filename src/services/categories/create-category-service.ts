import { CategoriesRepository } from '@/repositories/category-repository';
import { CategoryAlreadyExistsError } from '../errors/category-alterady-existes-error';

interface CreateCategoryServiceParams {
	description: string
}

export class CreateCategoryService {
	constructor(
		private categoryRepository: CategoriesRepository
	){}


	async execute({ description }: CreateCategoryServiceParams) {
		const categoryExists = await this.categoryRepository.findByDescription(description)

		console.log(categoryExists)

		if(categoryExists){
			throw new CategoryAlreadyExistsError()
		}
		
		const category = await this.categoryRepository.create({
			description
		})
		
		return category
	}
}
