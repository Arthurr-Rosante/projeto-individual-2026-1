import express from "express";
import * as tileController from "../controllers/tileController.js"

export const tileRoutes = express.Router();

// === ROTA: CRIAR === //
tileRoutes.post("/", (req, res) => tileController.create(req, res));

// === ROTA: ATUALIZAR TIPO === //
tileRoutes.put("/:id/repurpose", (req, res) => tileController.create(req, res));

// === ROTA: BUSCAR TODOS === //
tileRoutes.get("/", (req, res) => tileController.getAllTiles(req, res));

// === ROTA: BUSCAR POR ID === //
tileRoutes.get("/:id", (req, res) => tileController.getTileById(req, res));