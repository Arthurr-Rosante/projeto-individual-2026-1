import {execute} from '../database/config.js'

// === INSTRUÇÃO: BUSCAR TODOS === //
export function getAll() {
    const instruction = "SELECT * FROM species";

    console.log("\n[speciesModel.js | getAll] - Executando SELECT...");
    console.log(`\n[speciesModel.js | getAll] - Instrução: "${instruction}"`);
    
    return execute(instruction);
}

// === INSTRUÇÃO: BUSCAR POR ID === //
export function getById(id) {
    const instruction = "SELECT * FROM species WHERE id = ?";

    console.log("\n[speciesModel.js | getById] - Executando SELECT...");
    console.log(`\n[speciesModel.js | getById] - Instrução: "${instruction}"`);
    
    return execute(instruction, [id]);
}