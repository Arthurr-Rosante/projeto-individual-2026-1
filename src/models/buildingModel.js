import {execute} from '../database/config.js'

// === INSTRUÇÃO: BUSCAR TODOS === //
export function getAll() {
    const instruction = "SELECT * FROM building";

    console.log("\n[buildingModel.js | getAll] - Executando SELECT...");
    console.log(`\n[buildingModel.js | getAll] - Instrução: "${instruction}"`);
    
    return execute(instruction);
}

// === INSTRUÇÃO: BUSCAR POR ID === //
export function getById(id) {
    const instruction = "SELECT * FROM building WHERE id = ?";

    console.log("\n[buildingModel.js | getById] - Executando SELECT...");
    console.log(`\n[buildingModel.js | getById] - Instrução: "${instruction}"`);
    
    return execute(instruction, [id]);
}