import express from 'express';
import * as parkController from '../controllers/parkController.js';

export const parkRoutes = express.Router();

// === ROTA: CRIAR === //
parkRoutes.post("/", (req, res) => parkController.create(req, res));

// === ROTA: BUSCAR POR ID DO USUÁRIO === //
parkRoutes.get("/:idUser", (req, res) => parkController.getOneParkById(req, res));

// === ROTA: ATUALIZAR PARQUE POR ID DO USUÁRIO === //
parkRoutes.put("/:idUser/update", (req, res) => parkController.updatePark(req, res));