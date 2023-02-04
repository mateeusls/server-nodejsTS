import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export const AuthController = async (req: Request, res: Response) => {
	const { login, password } = req.body;

	const user = await prisma.user.findFirst({
		where: {
			cpf: login,
		},
	});

	if (user) {
		const validPassword = await bcrypt.compare(password, user.password);

		delete user.password;

		if (validPassword) {
			const token = jwt.sign(
				{ user: user.id },
				"d41d8cd98f00b204e9800998ecf8427e&",
				{
					expiresIn: "1h",
				}
			);

			res.json({ user, token });
		} else {
			res.status(401).json({ status: 401, message: "Senha Inválida" });
		}
	} else {
		res.status(401).json({ status: 401, message: "Usuário Inválido" });
	}
};

export const verifyToken = async (req: Request, res: Response, next: any) => {
	const { token } = req.body;
	try {
		const decoded = jwt.verify(token, "d41d8cd98f00b204e9800998ecf8427e&");

		if (decoded) {
			const user = await prisma.user.findFirst({
				where: {
					id: decoded.user,
				},
			});
			delete user.password;
			return res.json(user);
		}
	} catch (error) {
		return res.status(401).json({ status: 401, message: "Token Inválido" });
	}
};
