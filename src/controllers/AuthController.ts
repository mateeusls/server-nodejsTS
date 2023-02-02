import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export const AuthController = async (req: Request, res: Response) => {
	const { login, password } = req.body;

	const user = await prisma.user.findUnique({
		where: {
			cpf: login,
		},
	});

	if (user) {
		const validPassword = await bcrypt.compare(password, user.password);

		if (validPassword) {
			const token = jwt.sign({ user }, "d41d8cd98f00b204e9800998ecf8427e&", {
				expiresIn: "1h",
			});

			res.json({ token });
		} else {
			res.status(401).json({ status: 401, message: "Senha Inválida" });
		}
	} else {
		res.status(401).json({ status: 401, message: "Usuário Inválido" });
	}
};
