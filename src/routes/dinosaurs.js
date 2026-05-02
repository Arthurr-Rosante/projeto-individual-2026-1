import express from "express";
import * as dinosaurController from "../controllers/dinosaurController.js";

export const dinosaurRoutes = express.Router();

// === ROTA: CRIAR === //
dinosaurRoutes.post("/", (req, res) => dinosaurController.create(req, res));

// === ROTA: DELETAR === //
dinosaurRoutes.delete("/:idPark", (req, res) => dinosaurController.releaseDinosaur(req, res));

// === ROTA: BUSCAR DINOSSAUROS === //
dinosaurRoutes.get("/:idPark", (req, res) => {
    const {tileCol, tileRow} = req.query;
    if(tileCol !== undefined && tileRow !== undefined) {
        return dinosaurController.getOneDinosaurByParkId(req, res);
    }

    return dinosaurController.getAllDinosaurByParkId(req, res);
});