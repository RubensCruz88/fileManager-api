import { FilesRepository } from '@/repositories/files-repository';
import { File } from 'fastify-multer/lib/interfaces';
import { InvalidFileError } from './errors/invalid-file-error';

interface UploadServiceRequest {
	file: File,
	key: string
}

interface UploadServiceReply {
	file: any
}

export class UploadService {
	constructor(
		private filesRepository: FilesRepository
	){}

	async execute({ file, key }: UploadServiceRequest): Promise<UploadServiceReply | null>{
		if(!file.filename || !file.path){
			throw new InvalidFileError()
		}

		const params = {
			id: file.filename,
			key: key,
			original_name: file.originalname,
			path: file.path
		}

		const fileCreated = await this.filesRepository.create(params)

		return {file: fileCreated}
	}
}