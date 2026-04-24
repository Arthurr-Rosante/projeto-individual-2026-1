import express from 'express';
import * as enclosureController from '../controllers/enclosureController.js';

export const enclosureRoutes = express.Router();

// === ROTA: CRIAR === //
enclosureRoutes.post("/", (req, res) => enclosureController.create(req, res));

// === ROTA: ATUALIZAR DURABILIDADE === //
enclosureRoutes.put("/:id/durability", (req, res) => enclosureController.updateDurability(req, res));

// === ROTA: ATUALIZAR HP === //
enclosureRoutes.put("/:id/hp", (req, res) => enclosureController.updateHP(req, res));