import { Request } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: (req: Request, file, cb) => {
		cb(null, path.join("public", "uploads"));
	},
	filename: (req: Request, file, cb) => {
		// Extração da extensão do arquivo original:
		const extensaoArquivo = file.originalname.split(".")[1];

		// Indica o novo nome do arquivo:
		cb(null, `${Date.now()}.${extensaoArquivo}`);
	},
});

export const upload = multer({ storage });
