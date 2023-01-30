import { Router } from "express";
import {
	userCreate,
	userDelete,
	userIndex,
	userShow,
} from "../controllers/UserController";

export const router = Router();

router.get("/", userIndex);
router.get("/:id", userShow);
router.post("/", userCreate);
router.delete("/:id", userDelete);
