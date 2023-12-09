import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { FilesRepository } from '../files-repository';

export class PrismaFilesRepository implements FilesRepository {
	async create(data: Prisma.FileCreateInput) {
		const file = await prisma.file.create({
			data
		})

		return file
	}
}