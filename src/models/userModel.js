import { execute } from "../database/config.js";

// === INSTRUÇÃO SQL: REGISTRAR === //
export function register(username, email, password) {
    const instruction = 
        `INSERT INTO user(username, email, password) VALUES(?, ?, ?)`;
    
    console.log("[userModel.js | register] - Iniciando Consulta...");
    console.log(`[userModel.js | register] - Consulta: "${instruction}"`);
    
    return execute(instruction, [username, email, password]);
}

// === INSTRUÇÃO SQL: AUTENTICAR === //
export function authenticate(email, password) {
    const instruction = 
        `SELECT * FROM user`;
    
    console.log("[userModel.js | authenticate] - Iniciando Consulta...");
    console.log(`[userModel.js | authenticate] - Consulta: "${instruction}"`);
    
    return execute(instruction, [username, email, password]);
}