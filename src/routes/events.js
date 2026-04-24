import express from "express";
import * as eventsController from "../controllers/eventsController.js"

export const eventRoutes = express.Router();

// === ROTA: BUSCAR TODOS === //
eventRoutes.get("/", (req, res) => eventsController.getAllEvents(req, res));

// === ROTA: BUSCAR POR ID === //
eventRoutes.get("/:id", (req, res) => eventsController.getEventById(req, res));