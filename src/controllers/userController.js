import {register, authenticate} from "../models/userModel.js";

// === MÉTODO: REGISTRAR === //
export function registerUser(req, res) {
    const { username, email, password } = req.body;
}

// === MÉTODO: AUTENTICAR === //
export function authenticateUser(req, res) {
    const { email, password } = req.body;
}