import fs from "fs";
import {
	ExecuteActivityProps,
	NewChildEntityRecordProps,
	NewWorkflowEditDataProps,
} from "../../interfaces/WorkflowInterface";
import { ClientWF } from "../ClientSeSuite";

export async function NewChildEntityRecord({
	wfid,
	attributelist,
	childrelationshipid,
	mainentityid,
}: NewChildEntityRecordProps) {
	const client = await ClientWF();

	const arr = [];
	for (const i in attributelist) {
		arr.push({
			EntityAttributeID: `${i}`,
			EntityAttributeValue: `${attributelist[i]}`,
		});
	}

	try {
		const args = {
			WorkflowID: wfid,
			MainEntityID: mainentityid,
			ChildRelationshipID: childrelationshipid,
			EntityRecordList: [
				{
					EntityRecord: {
						EntityAttributeList: [
							{
								EntityAttribute: arr,
							},
						],
						RelationshipList: [],
					},
				},
			],
		};
		const results = await client.newChildEntityRecordListAsync(args);

		return results[0];
	} catch (error) {
		console.log(error);
		return error;
	}
}

export async function NewWorkflowEditData({
	processid,
	wftitle,
	entityid,
	attributelist,
	filelist,
}: NewWorkflowEditDataProps) {
	const client = await ClientWF();

	const arr = [];
	for (const i in attributelist) {
		arr.push({
			EntityAttributeID: `${i}`,
			EntityAttributeValue: `${attributelist[i]}`,
		});
	}

	const files = [];
	for (const i in filelist) {
		for (const a of filelist[i]) {
			files.push({
				EntityAttributeID: i,
				FileName: a.filename,
				FileContent: fs.readFileSync(a.path).toString("base64"),
			});
		}
	}
	try {
		const args = {
			ProcessID: processid,
			WorkflowTitle: wftitle,
			EntityList: [
				{
					Entity: {
						EntityID: entityid,
						EntityAttributeList: [
							{
								EntityAttribute: arr,
							},
						],
						EntityAttributeFileList: [
							{
								EntityAttributeFile: files,
							},
						],
					},
				},
			],
		};
		const results = await client.newWorkflowEditDataAsync(args);
		return results[0];
	} catch (error) {
		console.log(error);
		return error;
	}
}

export async function ExecuteActivity({
	wfid,
	activityid,
	ActionSequence,
}: ExecuteActivityProps) {
	const client = await ClientWF();

	try {
		const args = {
			WorkflowID: wfid,
			ActivityID: activityid,
			ActionSequence: ActionSequence,
			UserID: "",
			ActivityOrder: "",
		};
		const results = await client.executeActivityAsync(args);

		return results[0];
	} catch (error) {
		console.log(error);
		return error;
	}
}
