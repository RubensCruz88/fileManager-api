import { FastifyReply, FastifyRequest } from "fastify";

export async function upload(request: FastifyRequest, reply: FastifyReply) {

	return reply.status(200).send("arquivo")
}