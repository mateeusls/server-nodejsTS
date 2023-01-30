import { ClientWF } from "../ClientSeSuite";

export async function NewChildEntityRecord(
	wfid,
	mainentityid,
	childrelationshipid,
	attributelist
) {
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

export async function NewWorkflowEditData(
	processid,
	wftitle,
	entityid,
	attributelist,
	filelist
) {
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
								EntityAttributeFile: filelist,
							},
						],
					},
				},
			],
		};
		const results = await client.newWorkflowEditDataAsync(args);

		console.log(results[0]);
		return results[0];
	} catch (error) {
		console.log(error);
		return error;
	}
}

// NewWorkflowEditData(
// 	"mpp01-prc-regprofissional",
// 	"Teste API",
// 	"registroprof",
// 	{ nomeprofissiona: "Matheus Teste - 30/01" },
// 	""
// );
