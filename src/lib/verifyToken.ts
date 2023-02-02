import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Get JWT from request headers
	const token = req.headers["authorization"];

	// Verify JWT
	jwt.verify(token, "d41d8cd98f00b204e9800998ecf8427e", (err, decoded) => {
		if (err) {
			// Send error message
			res.status(401).json({ message: "Unauthorized" });
		} else {
			// Add user's information to request object
			req.cookies.userId = decoded;
			next();
		}
	});
};
