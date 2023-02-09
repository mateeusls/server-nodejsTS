import axios from "axios";
import { Request, Response } from "express";

interface AxiosResponse {
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

	const { data } = await axios<AxiosResponse | any>({
		method: "POST",
		url: "https://integrationsesuiteh.herokuapp.com/wf/wf_ED",
		data: {
			dominio: process.env.DOMINIO_SESUITE,
			processid,
			wftitle,
			entityid,
			attributelist,
			filelist,
		},
	});

	if (data.Status === "SUCCESS") {
		return res.status(200).json(data);
	} else {
		return res.status(404).json(data);
	}
}

export async function NewChildEntityRecordController(
	req: Request,
	res: Response
) {
	const { wfid, mainentityid, childrelationshipid, attributelist } = req.body;

	const { data } = await axios<AxiosResponse | any>({
		method: "POST",
		url: "https://integrationsesuiteh.herokuapp.com/wf/wf_ER",
		data: {
			dominio: process.env.DOMINIO_SESUITE,
			wfid,
			mainentityid,
			childrelationshipid,
			attributelist,
		},
	});

	if (data.Status === "SUCCESS") {
		return res.status(200).json(data);
	} else {
		return res.status(404).json(data);
	}
}

export async function ExecuteActivityController(req: Request, res: Response) {
	const { wfid, activityid, ActionSequence } = req.body;

	const { data } = await axios<AxiosResponse | any>({
		method: "POST",
		url: "https://integrationsesuiteh.herokuapp.com/wf/wf_ea",
		data: {
			dominio: process.env.DOMINIO_SESUITE,
			wfid,
			activityid,
			ActionSequence,
		},
	});

	if (data.Status === "SUCCESS") {
		return res.status(200).json(data);
	} else {
		return res.status(404).json(data);
	}
}
