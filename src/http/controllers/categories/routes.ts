import { FastifyInstance} from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createCategory } from "./createCategory";
import { listCategories } from "./listCategories";
import { findCategoryById } from "./findCategoryById";

export async function categoriesRoutes(app: FastifyInstance){
	app.addHook('onRequest',verifyJWT)

	app.post('/category', createCategory)
	app.get('/category', listCategories)
	app.get('/category/:id', findCategoryById)

}
