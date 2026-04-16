import express from "express";
import {registerUser, authenticateUser} from "../controllers/userController.js"

export const userRoutes = express.Router();

// === ROTA: CADASTRO === //
userRoutes.post("/register", (req, res) => registerUser(req, res));

// === ROTA: AUTENTICAÇÃO === //
userRoutes.post("/login", (req, res) => authenticateUser(req, res));