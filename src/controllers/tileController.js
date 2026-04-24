import * as tileModel from '../models/tileModel.js';
import isUndefined from '../utils/isUndefined.js';

// === FUNÇÃO: CRIAR === //
export function create(req, res) {
    const {idPark, idBuilding, position_col, position_row} = req.body;

    if(isUndefined(idPark)) res.status(400).send("ID do Parque não foi definido!");
    if(isUndefined(idBuilding)) res.status(400).send("ID da Construção não foi definido!");
    if(isUndefined(position_col)) res.status(400).send("Posição da Coluna não foi definida!");
    if(isUndefined(position_row)) res.status(400).send("Posição da Linha não foi definida!");

    tileModel.create(idPark, idBuilding, position_col, position_row)
        .then((result) => res.status(201).json(result))
        .catch((error) => {
            console.error(`\n[tileController.js | create] - Erro: ${error}`);
            console.error(`\n[tileController.js | create] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

// === FUNÇÃO: ATUALIZAR TIPO === //
export function updateBuildingType(req, res) {
    const {idTile, newIdBuilding} = req.body;

    if(isUndefined(idTile)) res.status(400).send("ID do Tile não foi definido!");
    if(isUndefined(newIdBuilding)) res.status(400).send("ID da Construção não foi definido!");

    tileModel.updateBuildingType(idTile, newIdBuilding)
        .then((result) => res.status(200).json(result)) // retorna objeto com Tile atualizado
        .catch((error) => {
            console.error(`\n[tileController.js | updateBuildingType] - Erro: ${error}`);
            console.error(`\n[tileController.js | updateBuildingType] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

// === FUNÇÃO: BUSCAR TODOS === //
export function getAllTiles(req, res) {
    tileModel.getAll()
        .then((result) => res.status(200).json(result))
        .catch((error) => {
            console.error(`\n[tileController.js | getAllTiles] - Erro: ${error}`);
            console.error(`\n[tileController.js | getAllTiles] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

// === FUNÇÃO: BUSCAR POR ID === //
export function getTileById(req, res) {
    const {id} = req.params;

    if(isUndefined(id)) res.status(400).send("ID de Tile não foi definido!");

    tileModel.getById(id)
        .then((result) => res.status(200).json(result))
        .catch((error) => {
            console.error(`\n[tileController.js | getTileById] - Erro: ${error}`);
            console.error(`\n[tileController.js | getTileById] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}