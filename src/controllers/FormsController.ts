import axios from "axios";
import { Request, Response } from "express";

// CPF - 00778021440; RNP - 1806240335

export async function CargoFuncao(req: Request, res: Response) {
	const processid = "mpp01-pcr-artcargofuncao";
	const entityid = "artcargoofuncao";
	const dominio = process.env.DOMINIO_SESUITE;

	// const files = req.files;
	// const filelist = [];
	// for (const i in files) {
	// 	filelist.push({
	// 		EntityAttributeID: files[i].fieldname,
	// 		FileName: files[i].filename,
	// 		FileContent: fs.readFileSync(files[i].path).toString("base64"),
	// 	});
	// }

	const datas = {
		processid,
		wftitle: req.body.nomeprofissiona,
		entityid,
		dominio,
		args: req.body,
		filelist: "",
	};

	try {
		let sendData = {};
		await axios({
			method: "POST",
			url: "https://integrationsesuiteh.herokuapp.com/wf/wf_ED",
			data: datas,
		})
			.then(async (response) => {
				const wfid = await response.data.RecordID;
				sendData = await response.data;
				const data = {
					dominio,
					wfid,
					activityid: "ATV-01-INICIADOR",
					ActionSequence: "1",
				};
				const respActivity = await axios({
					method: "POST",
					url: "https://integrationsesuiteh.herokuapp.com/wf/wf_ea",
					data: data,
				});

				res.json({
					instance: response.data,
					activity: respActivity.data,
				});
			})
			.catch((error) => {});
	} catch (error) {
		res.redirect("/registro_profissional");
	}
}
