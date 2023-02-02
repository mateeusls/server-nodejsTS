import { Request, Response } from "express";
import {
	ExecuteActivity,
	NewChildEntityRecord,
	NewWorkflowEditData,
} from "../../services/Methods/Workflow";

interface ResponseProps {
	Status: string;
	code: number;
	Detail: string;
	RecordKey: string;
	RecordId: string;
}

export async function NewWorkflowEditDataController(
	req: Request,
	res: Response
) {
	const { processid, wftitle, entityid, attributelist, filelist } = req.body;

	const response: ResponseProps = await NewWorkflowEditData({
		processid,
		wftitle,
		entityid,
		attributelist,
		filelist,
	});

	if (response.Status === "SUCCESS") {
		return res.status(200).json(response);
	} else {
		return res.status(404).json(response);
	}
}

export async function NewChildEntityRecordController(
	req: Request,
	res: Response
) {
	const { wfid, mainentityid, childrelationshipid, attributelist } = req.body;

	const response: ResponseProps = await NewChildEntityRecord({
		wfid,
		mainentityid,
		childrelationshipid,
		attributelist,
	});

	if (response.Status === "SUCCESS") {
		return res.status(200).json(response);
	} else {
		return res.status(404).json(response);
	}
}

export async function ExecuteActivityController(req: Request, res: Response) {
	const { wfid, activityid, ActionSequence } = req.body;

	const response: ResponseProps = await ExecuteActivity({
		wfid,
		activityid,
		ActionSequence,
	});

	if (response.Status === "SUCCESS") {
		return res.status(200).json(response);
	} else {
		return res.status(404).json(response);
	}
}
