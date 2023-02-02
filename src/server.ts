import cors from "cors";
import express from "express";
import { router } from "./Routes";
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(3333, () => console.log("Server is running in the port 3333"));
