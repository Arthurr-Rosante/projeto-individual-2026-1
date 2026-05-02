import * as tileModel from '../models/tileModel.js';
import * as dinosaurModel from '../models/dinosaurModel.js';
import isUndefined from '../utils/isUndefined.js';

// === FUNÇÃO: CRIAR === //
export function create(req, res) {
    const {idPark, tileCol, tileRow, idBuilding} = req.body;

    if(isUndefined(idPark)) res.status(400).send("ID do Parque não foi definido!");
    if(isUndefined(tileCol)) res.status(400).send("Posição da Coluna não foi definida!");
    if(isUndefined(tileRow)) res.status(400).send("Posição da Linha não foi definida!");
    if(isUndefined(idBuilding)) res.status(400).send("ID da Construção não foi definido!");

    tileModel.create(idPark, tileCol, tileRow, idBuilding)
        .then((result) => res.status(201).json(result))
        .catch((error) => {
            console.error(`\n[tileController.js | create] - Erro: ${error}`);
            console.error(`\n[tileController.js | create] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

// === FUNÇÃO: ATUALIZAR TIPO === //
export function updateTileType(req, res) {
    const {idBuilding} = req.body;
    const {idPark} = req.params;
    const {tileCol, tileRow} = req.query;

    if(isUndefined(idPark)) res.status(400).send("ID do Parque não foi definido!");
    if(isUndefined(tileCol)) res.status(400).send("Posição da Coluna não foi definida!");
    if(isUndefined(tileRow)) res.status(400).send("Posição da Linha não foi definida!");
    if(isUndefined(idBuilding)) res.status(400).send("ID da Construção não foi definido!");

    // verifica se o Tile possui um dinossauro nele
    dinosaurModel.getOneDinosaurByParkId(idPark, tileCol, tileRow)
        .then((result) => {
            // se sim, retorna erro de conflito
            if(result.length > 0) {
                res.status(409).json({message: "Este Tile possui um Dinossauro, Remova-o antes de alterar seu tipo!"});
                return
            }
            
            // se não, prossegue
            tileModel.updateTileType(idBuilding, idPark, tileCol, tileRow)
                .then((result) => res.status(200).json(result)) // retorna objeto com Tile atualizado
                .catch((error) => {
                    console.error(`\n[tileController.js | updateTileType] - Erro: ${error}`);
                    console.error(`\n[tileController.js | updateTileType] - SQL Message: ${error.sqlMessage}`);
                    res.status(500).json(error.sqlMessage);
                });
        })

}

// === FUNÇÃO: BUSCAR TODOS === //
export function getAllTileByParkId(req, res) {
    const {idPark} = req.params;

    if(isUndefined(idPark)) res.status(400).send("ID do Parque não foi definido!");

    tileModel.getAllTileByParkId(idPark)
        .then((result) => res.status(200).json(result))
        .catch((error) => {
            console.error(`\n[tileController.js | getAllTileByParkId] - Erro: ${error}`);
            console.error(`\n[tileController.js | getAllTileByParkId] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

// === FUNÇÃO: BUSCAR POR ID === //
export function getOneTileByParkId(req, res) {
    const {idPark} = req.params;
    const {tileCol, tileRow} = req.query;

    if(isUndefined(idPark)) res.status(400).send("ID do Parque não foi definido!");
    if(isUndefined(tileCol)) res.status(400).send("Posição da Coluna não foi definida!");
    if(isUndefined(tileRow)) res.status(400).send("Posição da Linha não foi definida!");

    tileModel.getOneTileByParkId(idPark, tileCol, tileRow)
        .then((result) => res.status(200).json(result))
        .catch((error) => {
            console.error(`\n[tileController.js | getOneTileByParkId] - Erro: ${error}`);
            console.error(`\n[tileController.js | getOneTileByParkId] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}