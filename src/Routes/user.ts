import { Router } from "express";
import {
	userCreate,
	userDelete,
	userIndex,
	userShow,
} from "../controllers/UserController";

export const userRouter = Router();

userRouter.get("/", userIndex);
userRouter.get("/:id", userShow);
userRouter.post("/", userCreate);
userRouter.delete("/:id", userDelete);
