import * as enclosureModel from '../models/enclosureModel.js'
import isUndefined from "../utils/isUndefined.js";

// === FUNÇÃO: CRIAR === //
export function create(req, res) {
    const {idTile, durability, hp} = req.body;

    if(isUndefined(idTile)) res.status(400).send("ID de Tile não foi definido!");
    if(isUndefined(durability)) res.status(400).send("Durabilidade de Cercado não foi definido!");
    if(isUndefined(hp)) res.status(400).send("HP de Cercado não foi definido!");

    enclosureModel.create(idTile, durability, hp)
        .then((result) => res.status(201).json(result))
        .catch((error) => {
            console.error(`\n[enclosureController.js | create] - Erro: ${error}`);
            console.error(`\n[enclosureController.js | create] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });

}

// === FUNÇÃO: ATUALIZAR DURABILIDADE === //
export function updateDurability(req, res) {
    const {durability} = req.body;
    const {idEnclosure} = req.params;

    if(isUndefined(idEnclosure)) res.status(400).send("ID de Cercado não foi definido!");
    if(isUndefined(durability)) res.status(400).send("Durabilidade de Cercado não foi definido!");

    enclosureModel.updateDurability(idEnclosure, durability)
        .then((result) => res.status(200).json(result)) // retorna objeto de enclosure atualizado
        .catch((error) => {
            console.error(`\n[enclosureController.js | updateDurability] - Erro: ${error}`);
            console.error(`\n[enclosureController.js | updateDurability] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });

}

// === FUNÇÃO: ATUALIZAR HP === //
export function updateHP(req, res) {
    const {hp} = req.body;
    const {idEnclosure} = req.params;

    if(isUndefined(idEnclosure)) res.status(400).send("ID de Cercado não foi definido!");
    if(isUndefined(hp)) res.status(400).send("HP de Cercado não foi definido!");

    enclosureModel.updateHP(idEnclosure, hp)
        .then((result) => res.status(200).json(result)) // retorna objeto de enclosure atualizado
        .catch((error) => {
            console.error(`\n[enclosureController.js | updateHP] - Erro: ${error}`);
            console.error(`\n[enclosureController.js | updateHP] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });

}