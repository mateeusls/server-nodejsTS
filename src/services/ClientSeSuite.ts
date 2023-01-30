process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { BasicAuthSecurity, createClientAsync } from "soap";

const user = {
	login: "api.sesuite",
	password: "api.sesuite0",
};

export async function ClientSoap(componenteSuite: string) {
	const client = await createClientAsync(
		`http://se.creape.org.br/se/ws/${componenteSuite}.php?wsdl`
	);

	const basicAuth = new BasicAuthSecurity(user.login, user.password);

	client.setSecurity(basicAuth);

	return client;
}

export async function ClientWF() {
	const Client = await ClientSoap("wf_ws");

	return Client;
}

export async function ClientADM() {
	const Client = await ClientSoap("adm_ws");

	console.log(Client);
}
