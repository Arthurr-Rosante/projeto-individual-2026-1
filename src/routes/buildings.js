import express from "express";
import * as buildingController from "../controllers/buildingController.js"

export const buildingRoutes = express.Router();

// === ROTA: BUSCAR TODAS === //
buildingRoutes.get("/", (req, res) => buildingController.getAllBuildings(req, res));

// === ROTA: BUSCAR POR ID === //
buildingRoutes.get("/:id", (req, res) => buildingController.getBuildingById(req, res));