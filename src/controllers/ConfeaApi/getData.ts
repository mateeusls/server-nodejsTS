import { Request, Response } from "express";
import { api } from "../../services/api";

export const ProfissionaisController = async (req: Request, res: Response) => {
	const { rnp, cpf } = req.body;

	const response = await api({
		method: "POST",
		url: "Profissionais/Listar",
		data: { prfCadCodRnp: rnp || "", sisIdtPrfNroCpf: cpf || "" },
	});

	if (response.data.entidade.length > 0) {
		return res.status(200).json(response.data.entidade[0]);
	} else {
		return res.status(404).json(response.data);
	}
};

export const CarteirasController = async (req: Request, res: Response) => {
	const { rnp } = req.body;

	await api({
		method: "POST",
		url: "Carteiras/Listar",
		data: { prfCadCodRnp: rnp },
	})
		.then((response) => {
			if (response.data.entidade.length > 0) {
				return res.status(200).json(response.data.entidade[0]);
			}
		})
		.catch((error) => {
			if (error.response.data.status === 400) {
				return res.status(404).json({ message: "Profissional não encontrado" });
			}
		});
};

export const CreasController = async (req: Request, res: Response) => {
	const { creCadCod } = req.body;

	await api({
		method: "POST",
		url: "Creas/Listar",
		data: { creCadCod: creCadCod },
	})
		.then((response) => {
			if (response.data.entidade.length > 0) {
				return res.status(200).json(response.data.entidade[0]);
			}
		})
		.catch((error) => {
			if (error.response.data.status === 400) {
				return res.status(404).json({ message: "Crea não encontrado" });
			}
		});
};

export const EnderecosController = async (req: Request, res: Response) => {
	const { rnp } = req.body;

	const response = await api({
		method: "POST",
		url: "Enderecos/Listar",
		data: { prfCadCodRnp: rnp },
	});

	if (response.data.entidade.length > 0) {
		return res.status(200).json(response.data.entidade[0]);
	} else {
		return res.status(404).json(response.data);
	}
};

export const HistoricoRegistroController = async (
	req: Request,
	res: Response
) => {
	const { rnp } = req.body;

	const response = await api({
		method: "POST",
		url: "HistoricoRegistro/Listar",
		data: { prfCadCodRnp: rnp },
	});

	if (response.data.entidade.length > 0) {
		return res.status(200).json(response.data.entidade[0]);
	} else {
		return res.status(404).json(response.data);
	}
};

export const ImagensController = async (req: Request, res: Response) => {
	const { rnp } = req.body;

	const response = await api({
		method: "POST",
		url: "Imagens/Listar",
		data: { prfCadCodRnp: rnp },
	});

	if (response.data.entidade.length > 0) {
		return res.status(200).json(response.data.entidade[0]);
	} else {
		return res.status(404).json(response.data);
	}
};

export const TitulosController = async (req: Request, res: Response) => {
	const { rnp } = req.body;

	await api({
		method: "POST",
		url: "Titulos/Listar",
		data: { prfCadCodRnp: rnp },
	})
		.then((response) => {
			if (response.data.entidade.length > 0) {
				return res.status(200).json(response.data.entidade[0]);
			}
		})
		.catch((error) => {
			if (error.response.data.status === 400) {
				return res.status(404).json({ message: "Profissional não encontrado" });
			}
		});
};

export const VistosController = async (req: Request, res: Response) => {
	const { rnp } = req.body;

	const response = await api({
		method: "POST",
		url: "Vistos/Listar",
		data: { prfCadCodRnp: rnp },
	});

	if (response.data.entidade.length > 0) {
		return res.status(200).json(response.data.entidade[0]);
	} else {
		return res.status(404).json(response.data);
	}
};
