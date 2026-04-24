import express from 'express';
import * as parkController from '../controllers/parkController.js';

export const parkRoutes = express.Router();

// === ROTA: CRIAR === //
parkRoutes.post("/", (req, res) => parkController.create(req, res));

// === ROTA: ATUALIZAR NOME === //
parkRoutes.put("/:id/rename", (req, res) => parkController.updateName(req, res));

// === ROTA: ATUALIZAR AVALIAÇÃO === //
parkRoutes.put("/:id/reevaluate", (req, res) => parkController.updateRating(req, res));

// === ROTA: ATUALIZAR QTD. MOEDAS === //
parkRoutes.put("/:id/balance", (req, res) => parkController.updateDinoCoins(req, res));
