import * as dinosaurModel from '../models/dinosaurModel.js';
import * as tileModel from '../models/tileModel.js';
import isUndefined from '../utils/isUndefined.js';

// === FUNÇÃO: CRIAR === //
export function create(req, res) {
    const {idPark, tileCol, tileRow, idSpecies} = req.body;

    if(isUndefined(idPark)) res.status(400).send("ID do Parque não foi definido!");
    if(isUndefined(tileCol)) res.status(400).send("Coluna do Tile não foi definida!");
    if(isUndefined(tileRow)) res.status(400).send("Linha do Tile não foi definida!");
    if(isUndefined(idSpecies)) res.status(400).send("ID da Espécie não foi definido!");

    
    tileModel.getOneTileByParkId(idPark, tileCol, tileRow)
    .then((result) => {
        if(result[0].category !== "enclosure") {
            res.status(409).json({message: "Este Tile não é um Cercado!"});
            return;
        }

        // verifica se o Tile já possui um dinossauro
        dinosaurModel.getOneDinosaurByParkId(idPark, tileCol, tileRow)
            .then((result) => {
                // se sim, retorna erro de conflito
                if(result.length > 0) {
                    res.status(409).json({message: "Este Tile já possui um Dinossauro!"});
                    return;
                }
    
                // se não, prossegue 
                dinosaurModel.create(idPark, tileCol, tileRow, idSpecies)
                    .then((result) => res.status(201).json(result))
                    .catch((error) => {
                        console.error(`\n[dinosaurController.js | create] - Erro: ${error}`);
                        console.error(`\n[dinosaurController.js | create] - SQL Message: ${error.sqlMessage}`);
                        res.status(500).json(error.sqlMessage);
                    });
            })
    })
    
}

// === FUNÇÃO: DELETAR === //
export function releaseDinosaur(req, res) {
    const {idPark} = req.params;
    const {tileCol, tileRow} = req.query;

    if(isUndefined(idPark)) res.status(400).send("ID do Parque não foi definido!");
    if(isUndefined(tileCol)) res.status(400).send("Coluna do Tile não foi definida!");
    if(isUndefined(tileRow)) res.status(400).send("Linha do Tile não foi definida!");

    dinosaurModel.releaseDinosaur(idPark, tileCol, tileRow)
        .then((result) => res.status(204).send())
        .catch((error) => {
            console.error(`\n[dinosaurController.js | releaseDinosaur] - Erro: ${error}`);
            console.error(`\n[dinosaurController.js | releaseDinosaur] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

// === FUNÇÃO: BUSCAR TODOS EM UM PARQUE === //
export function getAllDinosaurByParkId(req, res) {
    const {idPark} = req.params;

    if(isUndefined(idPark)) res.status(400).send("ID do Parque não foi definido!");
    
    dinosaurModel.getAllDinosaurByParkId(idPark)
        .then((result) => res.status(200).json(result))
        .catch((error) => {
            console.error(`\n[dinosaurController.js | getAllDinosaurByParkId] - Erro: ${error}`);
            console.error(`\n[dinosaurController.js | getAllDinosaurByParkId] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

// === INSTRFUNÇÃOUÇÃO: BUSCAR ESPECÍFICO EM UM PARQUE === //
export function getOneDinosaurByParkId(req, res) {
    const {idPark} = req.params;
    const {tileCol, tileRow} = req.query;

    if(isUndefined(idPark)) res.status(400).send("ID do Parque não foi definido!");
    if(isUndefined(tileCol)) res.status(400).send("Coluna do Tile não foi definida!");
    if(isUndefined(tileRow)) res.status(400).send("Linha do Tile não foi definida!");
    
    dinosaurModel.getOneDinosaurByParkId(idPark, tileCol, tileRow)
        .then((result) => res.status(200).json(result))
        .catch((error) => {
            console.error(`\n[dinosaurController.js | getOneDinosaurByParkId] - Erro: ${error}`);
            console.error(`\n[dinosaurController.js | getOneDinosaurByParkId] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}