import axios from "axios";

export const api = axios.create({
	baseURL: "https://api.teste.confea.org.br/",
	headers: { tokenAcesso: "C43B07EC-EBF0-41DC-9378-617832024429" },
});
