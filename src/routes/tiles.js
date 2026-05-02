import express from "express";
import * as tileController from "../controllers/tileController.js"

export const tileRoutes = express.Router();

// === ROTA: CRIAR === //
tileRoutes.post("/", (req, res) => tileController.create(req, res));

// === ROTA: ATUALIZAR TIPO === //
tileRoutes.put("/:idPark", (req, res) => tileController.updateTileType(req, res));

// === ROTA: BUSCAR === //
tileRoutes.get("/:idPark", (req, res) => {
    const {tileCol, tileRow} = req.query;
    if(tileCol !== undefined && tileRow !== undefined) {
        return tileController.getOneTileByParkId(req, res);
    }
    return tileController.getAllTileByParkId(req, res);
});