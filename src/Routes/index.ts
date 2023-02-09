import { Request, Response, Router } from "express";
import { verifyToken } from "../lib/verifyToken";
export const router = Router();

import { authRouter } from "./auth";
import { confeaApiRouter } from "./confeaApi";
import { userRouter } from "./user";
import { workflowRouter } from "./workflow";

router.get("/", verifyToken, (req: Request, res: Response) => {
	return res.json(req.cookies.userId);
});

router.use("/user", userRouter);
router.use("/wf", workflowRouter);
router.use("/api", confeaApiRouter);
router.use("/auth", authRouter);
