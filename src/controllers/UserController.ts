import { randomUUID } from "crypto";
import { Request, Response } from "express";

interface UserProps {
	id: string;
	name: string;
	email: string;
}

const userDatabase: UserProps[] = [];

export async function userIndex(req: Request, res: Response) {
	return res.json(userDatabase);
}

export async function userCreate(req: Request, res: Response) {
	const { name, email } = req.body;
	const id = randomUUID();

	const user: UserProps = {
		id,
		name,
		email,
	};

	userDatabase.push(user);

	return res.json(user);
}

export async function userShow(req: Request, res: Response) {
	const { id } = req.params;

	const user = userDatabase.find((user) => user.id === id);

	return res.json(user);
}

export async function userDelete(req: Request, res: Response) {
	const { id } = req.params;

	const userIndex = userDatabase.findIndex((user) => user.id === id);

	userDatabase.slice(userIndex, 1);

	return res.json({
		status: "SUCCESS",
		message: "Usuário deletado com sucesso",
	});
}
