import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({
	rejectUnauthorized: false, // (NOTE: this will disable client verification)
});

export const api = axios.create({
	httpsAgent,
	baseURL: "https://api.teste.confea.org.br/",
	headers: {
		tokenAcesso: "C43B07EC-EBF0-41DC-9378-617832024429",
	},
});
