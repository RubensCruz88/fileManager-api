import { FastifyInstance, FastifyRequest } from "fastify";
import { category } from "./controllers/category-controller";
import { authenticate } from "./controllers/authenticate-controller";
import { uploadFile } from '@/lib/multer';
import { upload } from "./controllers/upload-controller";

export async function appRoutes(app: FastifyInstance){
	app.post('/category', category)
	app.post('/session', authenticate)

	app.post('/upload/:key',{
		preHandler: uploadFile.single('file')
	},upload)

}
