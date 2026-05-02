import express from 'express';
import * as parkController from '../controllers/parkController.js';

export const parkRoutes = express.Router();

// === ROTA: CRIAR === //
parkRoutes.post("/", (req, res) => parkController.create(req, res));

// === ROTA: ATUALIZAR NOME === //
parkRoutes.patch("/:idPark/name", (req, res) => parkController.updateName(req, res));

// === ROTA: ATUALIZAR AVALIAÇÃO === //
parkRoutes.patch("/:idPark/rating", (req, res) => parkController.updateRating(req, res));

// === ROTA: ATUALIZAR QTD. MOEDAS === //
parkRoutes.patch("/:idPark/dinoCoins", (req, res) => parkController.updateDinoCoins(req, res));
