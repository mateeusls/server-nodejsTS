import { Request, Response, Router } from "express";
import {
	CarteirasController,
	CreasController,
	EnderecosController,
	HistoricoRegistroController,
	ImagensController,
	ProfissionaisController,
	TitulosController,
	VistosController,
} from "../controllers/ConfeaApi/getData";

export const confeaApiRouter = Router();

confeaApiRouter.get("/", (req: Request, res: Response) => {
	res.status(200).send({ message: "Hello my sir" });
});

confeaApiRouter.post("/Creas/Listar", CreasController);
confeaApiRouter.post("/Vistos/Listar", VistosController);
confeaApiRouter.post("/Imagens/Listar", ImagensController);
confeaApiRouter.post("/Titulos/Listar", TitulosController);
confeaApiRouter.post("/Carteiras/Listar", CarteirasController);
confeaApiRouter.post("/Enderecos/Listar", EnderecosController);
confeaApiRouter.post("/Profissionais/Listar", ProfissionaisController);
confeaApiRouter.post("/HistoricoRegistro/Listar", HistoricoRegistroController);
