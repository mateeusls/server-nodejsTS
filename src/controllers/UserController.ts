import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { api } from "../services/api";

// CPF - 00778021440; RNP - 1806240335

export async function userIndex(req: Request, res: Response) {
	const { rnp } = await req.body;

	const users = await prisma.user.findFirst({
		where: {
			rnp: rnp,
		},
	});

	return res.json(users);
}

export async function userCreate(req: Request, res: Response) {
	const { name, email, cpf, password } = await req.body;

	const { data } = await api({
		method: "POST",
		url: "Profissionais/Listar",
		data: { sisIdtPrfNroCpf: cpf },
	});

	const rnp = data.entidade[0].PrfCadCodRnp;

	if (rnp) {
		bcrypt.hash(password, 10, async (err, hash) => {
			if (err) {
				return res.status(500).json({ message: "Erro ao criar hash", err });
			} else {
				const user = await prisma.user.create({
					data: {
						name: name,
						email: email,
						cpf: cpf,
						password: hash,
						rnp: rnp,
					},
					select: {
						id: true,
						name: true,
						cpf: true,
						rnp: true,
						email: true,
						password: false,
					},
				});
				return res.json(user);
			}
		});
	}
}

export async function userShow(req: Request, res: Response) {
	const { id } = req.params;

	const user = await prisma.user.findFirst({
		where: {
			id: Number(id),
		},
	});

	return res.json(user);
}

export async function userDelete(req: Request, res: Response) {
	const { id } = req.params;

	const user = await prisma.user.delete({
		where: {
			id: Number(id),
		},
		select: {
			id: true,
			name: true,
			cpf: true,
			rnp: true,
			email: true,
			password: false,
		},
	});

	return res.json({ message: "Usuário deletado com sucesso", user });
}
