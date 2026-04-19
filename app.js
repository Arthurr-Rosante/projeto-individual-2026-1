// === CONFIGURAÇÃO DAS VARIÁVEIS DE AMBIENTE === //
import "./envLoad.js";

// === IMPORTAÇÃO DE DEPENDÊNCIAS === //
import path from "node:path";
import express from "express";
import cors from "cors";
import { routes } from "./src/routes/index.js";

// === CONFIGURAÇÃO DO SERVIDOR === //
const app = express();
const dir = import.meta.dirname;

const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(dir, "public")));

// === CONFIGURAÇÃO DE ROTAS === //
app.use("/api", routes);

// === INICIANDO SERVIDOR === //
app.listen(PORT, () => {
    console.log(`
        >_ [⚙️. ${process.env.AMBIENTE_PROCESSO}]\n
        >_ Servidor disponível em: http://${HOST}:${PORT}
    `);
});