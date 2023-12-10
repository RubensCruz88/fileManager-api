import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { contentParser } from "fastify-multer";

export const app = fastify()

app.register(contentParser)
app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
	if(error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Validation error.',
			issues: error.format()
		})
	}

	if(env.NODE_ENV !== 'production'){
		console.log(error)
	} else {
		//enviar email com o erro para tratamento futuro
	}

	return reply.status(500).send({message: 'Internal server error'})
})

