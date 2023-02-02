import { Router } from "express";
export const router = Router();

import { confeaApiRouter } from "./confeaApi";
import { userRouter } from "./user";
import { workflowRouter } from "./workflow";

router.use("/user", userRouter);
router.use("/wf", workflowRouter);
router.use("/api", confeaApiRouter);
