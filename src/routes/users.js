import express from "express";
import * as userController from "../controllers/userController.js"

export const userRoutes = express.Router();

// === ROTA: CADASTRO === //
userRoutes.post("/register", (req, res) => userController.register(req, res));

// === ROTA: AUTENTICAÇÃO === //
userRoutes.post("/login", (req, res) => userController.authenticate(req, res));