import fs from 'fs';
import path from 'path';
import { env } from '@/env';
import { FastifyRequest } from 'fastify';
import multer from 'fastify-multer';
import { File } from 'fastify-multer/lib/interfaces';

const storage = multer.diskStorage({
	destination: formatPath,
	filename: formatFileName
})

export const uploadFile = multer({storage})

function formatPath (req: FastifyRequest, file: File, cb: Function) {
	const now = new Date();
	const year = now.getFullYear().toString();
	const month = now.getMonth();
	const monthHash = month % 4
	const finalPath = `${env.UPLOAD_PATH}/${year}/${monthHash}/`;

	if (!fs.existsSync(finalPath)){
		fs.mkdirSync(finalPath,{recursive: true})
	}

	cb(null, finalPath)
}

function formatFileName(req: FastifyRequest, file: File, cb: Function) {
	const parsedFile = path.parse(file.originalname)
	const now = new Date();
	const nowWithTimezone = new Date(now.valueOf() - now.getTimezoneOffset() * 60000);
	const dateString = nowWithTimezone.toISOString()
	const formattedTimestamp = dateString.replace(/-|:|\.|T|Z/g,'')
	const finalFileName = parsedFile.name + '_' + formattedTimestamp + parsedFile.ext

	cb(null, finalFileName)
}