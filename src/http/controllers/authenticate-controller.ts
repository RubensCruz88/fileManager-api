import { FastifyRequest, FastifyReply} from 'fastify';
import { z } from "zod";
import { AuthenticateService } from '@/services/authenticate-service';
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemory-users-repository';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
	const autenthicateBodySchema = z.object({
		user: z.string(),
		password: z.string().min(4)
	})

	const { user, password } = autenthicateBodySchema.parse(request.body)

	try{
		const inMemoryUsersRepository = new InMemoryUsersRepository()
		const authenticateService = new AuthenticateService(inMemoryUsersRepository)
		const userReturned = authenticateService.execute({
			user,
			password
		})

		const token = await reply.jwtSign({},{
			sign: {
				sub: userReturned.user.user
			}
		})

		const refreshToken = await reply.jwtSign({},{
			sign: {
				sub: userReturned.user.user,
				expiresIn: '7d'
			}
		})

		return reply
			.setCookie('refreshToken',refreshToken,{
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true
			})
			.status(200).send({
			token
		})
	} catch (err){
		if(err instanceof InvalidCredentialsError){
			return reply.status(400).send({message: err.message})
		}

		throw err
	}
}