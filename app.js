import path from "node:path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { routes } from "./src/routes";

// === DEFINIÇÃO DO AMBIENTE === //
const environment = "desenvolvimento";
const envFile = environment === "producao" ?
    ".env" :
    ".env.dev";

dotenv.config({path: envFile});

// === CONFIGURAÇÃO DO SERVIDOR === //
const app = express();

const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

// === CONFIGURAÇÃO DE ROTAS === //
app.use("/api", routes);

// === INICIANDO SERVIDOR === //
app.listen(PORT, () => {
    console.log(`
        >_ [⚙️ ${process.env.AMBIENTE_PROCESSO}]\n
        >_ Servidor disponível em: http://${HOST}:${PORT}
    `);
});