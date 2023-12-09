import { FastifyInstance } from "fastify";
import { category } from "./controllers/category-controller";
import { authenticate } from "./controllers/authenticate-controller";
// import multer,{ contentParser } from 'fastify-multer';
import { upload } from "./controllers/upload-controller";

export async function appRoutes(app: FastifyInstance){
	// const uploadFile = multer({dest: 'uploads/'})

	app.post('/category', category)
	app.post('/session', authenticate)

	// app.register(contentParser)
	app.post('/upload',upload)

}