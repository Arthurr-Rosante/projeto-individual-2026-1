import * as eventsModel from '../models/eventsModel.js'
import isUndefined from "../utils/isUndefined.js";

// === MÉTODO: BUSCAR TODoS === //
export function getAllEvents(_, res) {
    eventsModel.getAll()
        .then((result) => res.status(200).json(result))
        .catch((error) => {
            console.error(`\n[eventsController.js | getAllEvents] - Erro: ${error}`);
            console.error(`\n[eventsController.js | getAllEvents] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

// === MÉTODO: BUSCAR POR ID === //
export function getEventById(req, res) {
    const {id} = req.params;

    if(isUndefined(id)) res.status(400).send("ID de Evento não foi definido!");

    eventsModel.getById(id)
        .then((result) => res.status(200).json(result))
        .catch((error) => {
            console.error(`\n[eventsController.js | getEventById] - Erro: ${error}`);
            console.error(`\n[eventsController.js | getEventById] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}