import express from "express";

import { userRoutes } from "./users.js";
import { parkRoutes } from "./parks.js";
import { tileRoutes } from "./tiles.js";
import { speciesRoutes } from "./species.js";
import { eventRoutes } from "./events.js";
import { buildingRoutes } from "./buildings.js";
import { dinosaurRoutes } from "./dinosaurs.js";

// === Router CENTRALIZADOR === //
export const routes = express.Router();

// === ROTAS DA APLICAÇÃO === //
routes.use("/users", userRoutes);
routes.use("/parks", parkRoutes);
routes.use("/tiles", tileRoutes);
routes.use("/species", speciesRoutes);
routes.use("/events", eventRoutes);
routes.use("/buildings", buildingRoutes);
routes.use("/dinosaurs", dinosaurRoutes);