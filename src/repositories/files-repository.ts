import { Prisma, File } from '@prisma/client';

export interface FilesRepository {
	create(data: Prisma.FileCreateInput): Promise<File> 
}