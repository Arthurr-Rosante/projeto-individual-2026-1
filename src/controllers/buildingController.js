import * as buildingModel from '../models/buildingModel.js'
import isUndefined from "../utils/isUndefined.js";

// === MÉTODO: BUSCAR TODAS === //
export function getAllBuildings(_, res) {
    buildingModel.getAll()
        .then((result) => res.status(200).json(result))
        .catch((error) => {
            console.error(`\n[buildingController.js | getAllBuildings] - Erro: ${error}`);
            console.error(`\n[buildingController.js | getAllBuildings] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

// === MÉTODO: BUSCAR POR ID === //
export function getBuildingById(req, res) {
    const {id} = req.params;

    if(isUndefined(id)) res.status(400).send("ID de Construção não foi definido!");

    buildingModel.getById(id)
        .then((result) => res.status(200).json(result))
        .catch((error) => {
            console.error(`\n[buildingController.js | getBuildingById] - Erro: ${error}`);
            console.error(`\n[buildingController.js | getBuildingById] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}