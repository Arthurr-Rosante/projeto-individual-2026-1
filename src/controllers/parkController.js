import * as parkModel from '../models/parkModel.js';
import isUndefined from "../utils/isUndefined.js";

// === FUNÇÃO: CRIAR === //
export function create(req, res) {
    const {idUser, parkName} = req.body;

    if(isUndefined(idUser)) res.status(400).send("Seu ID de Usuário não foi definido!");
    if(isUndefined(parkName)) res.status(400).send("Nome do Parque não foi definido!");

    parkModel.create(idUser, parkName)
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
    const {newName} = req.body;

    if(isUndefined(idPark)) res.status(400).send("ID do Parque não foi definido!");
    if(isUndefined(newName)) res.status(400).send("Novo nome do Parque não foi definido!");

    parkModel.updateName(idPark, newName)
        .then((result) => res.status(200).json())   // retorna o objeto do parque atualizado
        .catch((error) => {
            console.error(`\n[parkController.js | updateName] - Erro: ${error}`);
            console.error(`\n[parkController.js | updateName] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}


// === FUNÇÃO: ATUALIZAR AVALIAÇÃO === //
export function updateRating(req, res) {
    const {idPark} = req.params;
    const {newRating} = req.body;

    if(isUndefined(idPark)) res.status(400).send("ID do Parque não foi definido!");
    if(isUndefined(newRating)) res.status(400).send("Nova avaliação do Parque não foi definida!");

    parkModel.updateRating(idPark, newRating)
        .then((result) => res.status(200).json())   // retorna o objeto do parque atualizado
        .catch((error) => {
            console.error(`\n[parkController.js | updateRating] - Erro: ${error}`);
            console.error(`\n[parkController.js | updateRating] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}


// === FUNÇÃO: ATUALIZAR QTD. MOEDAS === //
export function updateDinoCoins(req, res) {
    const {idPark} = req.params;
    const {newCoinsCount} = req.body;

    if(isUndefined(idPark)) res.status(400).send("ID do Parque não foi definido!");
    if(isUndefined(newCoinsCount)) res.status(400).send("Novo saldo do Parque não foi definida!");
    
    parkModel.updateDinoCoins(idPark, newCoinsCount)
        .then((result) => res.status(200).json())   // retorna o objeto do parque atualizado
        .catch((error) => {
            console.error(`\n[parkController.js | updateDinoCoins] - Erro: ${error}`);
            console.error(`\n[parkController.js | updateDinoCoins] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}