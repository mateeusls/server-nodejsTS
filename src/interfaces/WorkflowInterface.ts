export interface NewChildEntityRecordProps {
	wfid: string;
	mainentityid: string;
	childrelationshipid: string;
	attributelist: object;
}

export interface NewWorkflowEditDataProps {
	processid: string;
	wftitle: string;
	entityid: string;
	attributelist: object;
	filelist: object;
}

export interface ExecuteActivityProps {
	wfid: string;
	activityid: string;
	ActionSequence: string;
}
