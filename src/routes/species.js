import express from "express";
import * as speciesController from "../controllers/speciesController.js"

export const speciesRoutes = express.Router();

// === ROTA: BUSCAR TODAS === //
speciesRoutes.get("/", (req, res) => speciesController.getAllSpecies(req, res));

// === ROTA: BUSCAR POR ID === //
speciesRoutes.get("/:id", (req, res) => speciesController.getSpeciesById(req, res));