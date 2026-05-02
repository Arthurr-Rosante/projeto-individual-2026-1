import * as parkModel from '../models/parkModel.js';
import isUndefined from "../utils/isUndefined.js";

// === FUNÇÃO: CRIAR === //
export function create(req, res) {
    const {idUser, name} = req.body;

    if(isUndefined(idUser)) res.status(400).send("Seu ID de Usuário não foi definido!");
    if(isUndefined(name)) res.status(400).send("Nome do Parque não foi definido!");

    parkModel.create(idUser, name)
        .then((result) => res.status(201).json(result))
        .catch((error) => {
            console.error(`\n[parkController.js | create] - Erro: ${error}`);
            console.error(`\n[parkController.js | create] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

// === FUNÇÃO: ATUALIZAR NOME === //
export function updateName(req, res) {
    const {idPark} = req.params;
    const {name} = req.body;

    if(isUndefined(idPark)) res.status(400).send("ID do Parque não foi definido!");
    if(isUndefined(name)) res.status(400).send("Novo nome do Parque não foi definido!");

    parkModel.updateName(idPark, name)
        .then((result) => res.status(200).json(result))   // retorna o objeto do parque atualizado
        .catch((error) => {
            console.error(`\n[parkController.js | updateName] - Erro: ${error}`);
            console.error(`\n[parkController.js | updateName] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}


// === FUNÇÃO: ATUALIZAR AVALIAÇÃO === //
export function updateRating(req, res) {
    const {idPark} = req.params;
    const {rating} = req.body;

    if(isUndefined(idPark)) res.status(400).send("ID do Parque não foi definido!");
    if(isUndefined(rating)) res.status(400).send("Nova avaliação do Parque não foi definida!");

    parkModel.updateRating(idPark, rating)
        .then((result) => res.status(200).json(result))   // retorna o objeto do parque atualizado
        .catch((error) => {
            console.error(`\n[parkController.js | updateRating] - Erro: ${error}`);
            console.error(`\n[parkController.js | updateRating] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}


// === FUNÇÃO: ATUALIZAR QTD. MOEDAS === //
export function updateDinoCoins(req, res) {
    const {idPark} = req.params;
    const {dinoCoins} = req.body;

    if(isUndefined(idPark)) res.status(400).send("ID do Parque não foi definido!");
    if(isUndefined(dinoCoins)) res.status(400).send("Novo saldo do Parque não foi definida!");
    
    parkModel.updateDinoCoins(idPark, dinoCoins)
        .then((result) => res.status(200).json(result))   // retorna o objeto do parque atualizado
        .catch((error) => {
            console.error(`\n[parkController.js | updateDinoCoins] - Erro: ${error}`);
            console.error(`\n[parkController.js | updateDinoCoins] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

// === INSTRUÇÃO: BUSCA POR ID DO USUÁRIO === //
export function getOneParkById(req, res) {
    const {idUser} = req.params;

    if(isUndefined(idUser)) res.status(400).send("ID de Usuário não foi definido!");

    parkModel.getOneParkById(idUser)
        .then((result) => res.status(200).json(result))
        .catch((error) => {
            console.error(`\n[parkController.js | getOneParkById] - Erro: ${error}`);
            console.error(`\n[parkController.js | getOneParkById] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}