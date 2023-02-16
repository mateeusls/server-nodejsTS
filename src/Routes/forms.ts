import { Router } from "express";
import { CargoFuncao } from "../controllers/FormsController";
import { upload } from "../lib/multer";

export const formsRouter = Router();

formsRouter.post(
	"/cargo_funcao",
	upload.array("anexocargahorar", 1),
	CargoFuncao
);
