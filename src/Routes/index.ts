import { Request, Response, Router } from "express";
export const router = Router();

import { authRouter } from "./auth";
import { confeaApiRouter } from "./confeaApi";
import { formsRouter } from "./forms";
import { userRouter } from "./user";

router.get("/", (req: Request, res: Response) => {
	return res.json({ message: "Hello World!" });
});

router.use("/user", userRouter);
router.use("/api", confeaApiRouter);
router.use("/auth", authRouter);
router.use("/forms", formsRouter);
