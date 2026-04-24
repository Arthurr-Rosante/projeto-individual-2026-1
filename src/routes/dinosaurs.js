import express from "express";
import * as dinosaurController from "../controllers/dinosaurController.js";

export const dinosaurRoutes = express.Router();

// === ROTA: CRIAR === //
dinosaurRoutes.post("/", (req, res) => dinosaurController.create(req, res));

// === ROTA: DELETAR === //
dinosaurRoutes.delete("/:id", (req, res) => dinosaurController.releaseDinosaur(req, res));