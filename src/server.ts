import cors from "cors";
import express from "express";
import { router } from "./Routes";
require("dotenv").config();
const app = express();

app.use(express.json());
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
	);
	//Quais são os métodos que a conexão pode realizar na API
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	app.use(cors());
	next();
});
app.use(router);

app.listen(3333, () => console.log("Server is running in the port 3333"));
