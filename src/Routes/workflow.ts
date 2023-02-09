import { Request, Response, Router } from "express";
import {
	ExecuteActivityController,
	NewChildEntityRecordController,
	NewWorkflowEditDataController,
} from "../controllers/Methods/WorkflowController";

export const workflowRouter = Router();

workflowRouter.get("/", (req: Request, res: Response) => {
	res.status(200).send({ message: "Hello my sir" });
});

workflowRouter.post("/wf_ed", NewWorkflowEditDataController);
workflowRouter.post("/wf_er", NewChildEntityRecordController);
workflowRouter.post("/wf_ea", ExecuteActivityController);
