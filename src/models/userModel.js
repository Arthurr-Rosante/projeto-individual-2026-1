import { execute } from "../database/config.js";

const allowedFields = "id, username, email, createdAt, updatedAt";

// === INSTRUÇÃO: REGISTRAR === //
export function register(username, email, password) {
    const instruction = 
    "INSERT INTO user(username, email, password) VALUES(?, ?, ?)";
    
    console.log("\n[userModel.js | register] - Executando INSERT...");
    console.log(`\n[userModel.js | register] - Instrução: "${instruction}"`);
    
    return execute(instruction, [username, email, password]);
}

// === INSTRUÇÃO: AUTENTICAR === //
export function authenticate(email, password) {
    const instruction = 
        `SELECT ${allowedFields} FROM user WHERE email = ? AND password = ?`;
    
    console.log("\n[userModel.js | authenticate] - Executando SELECT...");
    console.log(`\n[userModel.js | authenticate] - Instrução: "${instruction}"`);
    
    return execute(instruction, [email, password]);
}

// === INSTRUÇÃO: PROCURAR POR EMAIL === //
export function getByEmail(email) {
    const instruction = 
    `SELECT ${allowedFields} FROM user WHERE email = ?`;
    
    console.log("\n[userModel.js | getByEmail] - Executando SELECT...");
    console.log(`\n[userModel.js | getByEmail] - Instrução: "${instruction}"`);
    
    return execute(instruction, [email]);
}