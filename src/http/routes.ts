import { FastifyInstance, FastifyRequest } from "fastify";
import { category } from "./controllers/categories/createCategory";
import { authenticate } from "./controllers/authenticate-controller";
import { uploadFile } from '@/lib/multer';
import { upload } from "./controllers/upload-controller";
import { verifyJWT } from "./middlewares/verify-jwt";
import { refresh } from "./controllers/refresh-controller";

export async function appRoutes(app: FastifyInstance){
	app.post('/session', authenticate)

	app.patch('/token/refresh', refresh)

	/* Authenticated */
	app.post('/upload/:key',{
		onRequest: verifyJWT,
		preHandler: uploadFile.single('file')
	},upload)

}
