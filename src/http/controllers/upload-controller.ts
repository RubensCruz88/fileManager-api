import { PrismaFilesRepository } from "@/repositories/prisma/prisma-files-repository";
import { UploadService } from "@/services/upload-service";
import { FastifyReply, FastifyRequest } from "fastify";

interface RequestParams {
	key: string
}

export async function upload(request: FastifyRequest, reply: FastifyReply) {
	const params = request.params

	//TODO - ajustar tipagem do request.params

	try {
		const prismaFilesRepository = new PrismaFilesRepository()
		const uploadService = new UploadService(prismaFilesRepository)
		const category = await uploadService.execute({
			key: params.key,
			file: request.file
		})

		return reply.status(200).send(category)

	} catch(err) {
		return reply.status(500).send({message: err.message}) //TODO
	}


	return reply.status(200).send("arquivo")
}