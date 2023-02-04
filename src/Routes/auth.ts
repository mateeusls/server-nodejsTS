import { Router } from "express";
import { AuthController, verifyToken } from "../controllers/AuthController";

export const authRouter = Router();

authRouter.post("/", AuthController);
authRouter.post("/verify", verifyToken);
