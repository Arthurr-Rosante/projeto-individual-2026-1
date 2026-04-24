import * as dinosaurModel from '../models/dinosaurModel.js';
import isUndefined from '../utils/isUndefined.js';

// === FUNÇÃO: CRIAR === //
export function create(req, res) {
    const {idEnclosure, idSpecies} = req.body;

    if(isUndefined(idEnclosure)) res.status(400).send("ID do Cercado não foi definido!");
    if(isUndefined(idSpecies)) res.status(400).send("ID da Espécie não foi definido!");

    dinosaurModel.create(idEnclosure, idSpecies)
        .then((result) => res.status(201).json(result))
        .catch((error) => {
            console.error(`\n[dinosaurController.js | create] - Erro: ${error}`);
            console.error(`\n[dinosaurController.js | create] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

// === FUNÇÃO: DELETAR === //
export function releaseDinosaur(req, res) {
    const {id} = req.params;

    if(isUndefined(id)) res.status(400).send("ID do Dinossauro não foi definido!");

    dinosaurModel.releaseDinosaur(id)
        .then((result) => res.status(200).send("Dinossauro excluído com sucesso!"))
        .catch((error) => {
            console.error(`\n[dinosaurController.js | releaseDinosaur] - Erro: ${error}`);
            console.error(`\n[dinosaurController.js | releaseDinosaur] - SQL Message: ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}
