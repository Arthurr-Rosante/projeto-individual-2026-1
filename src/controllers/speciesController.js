import * as speciesModel from '../models/speciesModel.js'
import isUndefined from "../utils/isUndefined.js";

// === MÉTODO: BUSCAR TODAS === //
export function getAllSpecies(_, res) {
    speciesModel.getAll()
        .then((result) => res.status(200).json(result))
        .catch((error) => {
            console.error(`\n[speciesController.js | getAllSpecies] - Erro: ${error}`);
            console.error(`\n[speciesController.js | getAllSpecies] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

// === MÉTODO: BUSCAR POR ID === //
export function getSpeciesById(req, res) {
    const {id} = req.params;

    if(isUndefined(id)) res.status(400).send("ID de Espécie não foi definido!");

    speciesModel.getById(id)
        .then((result) => res.status(200).json(result))
        .catch((error) => {
            console.error(`\n[speciesController.js | getSpeciesById] - Erro: ${error}`);
            console.error(`\n[speciesController.js | getSpeciesById] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}