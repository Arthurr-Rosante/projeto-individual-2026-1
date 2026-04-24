import * as userModel from "../models/userModel.js";
import isUndefined from "../utils/isUndefined.js";

// === FUNÇÃO: REGISTRAR === //
export function register(req, res) {
    const { username, email, password } = req.body;

    if(isUndefined(username)) res.status(400).send("Seu Username não foi definido!");
    if(isUndefined(email)) res.status(400).send("Seu Email não foi definido!");
    if(isUndefined(password)) res.status(400).send("Sua Senha não foi definida!");

    userModel.register(username, email, password)
        .then((result) => res.status(201).json(result))
        .catch((error) => {
            console.error(`\n[userController.js | register] - Erro: ${error}`);
            console.error(`\n[userController.js | register] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

// === FUNÇÃO: AUTENTICAR === //
export function authenticate(req, res) {
    const { email, password } = req.body;

    if(isUndefined(email)) res.status(400).send("Seu Email não foi definido!");
    if(isUndefined(password)) res.status(400).send("Sua Senha não foi definida!");

    userModel.authenticate(email, password)
        .then((result) => res.status(200).json(result))
        .catch((error) => {
            console.error(`\n[userController.js | authenticate] - Erro: ${error}`);
            console.error(`\n[userController.js | authenticate] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}