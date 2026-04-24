import {execute} from '../database/config.js'

// === INSTRUÇÃO: BUSCAR TODOS === //
export function getAll() {
    const instruction = "SELECT * FROM events";

    console.log("\n[eventsModel.js | getAll] - Executando SELECT...");
    console.log(`\n[eventsModel.js | getAll] - Instrução: "${instruction}"`);
    
    return execute(instruction);
}

// === INSTRUÇÃO: BUSCAR POR ID === //
export function getById(id) {
    const instruction = "SELECT * FROM events WHERE id = ?";

    console.log("\n[eventsModel.js | getById] - Executando SELECT...");
    console.log(`\n[eventsModel.js | getById] - Instrução: "${instruction}"`);
    
    return execute(instruction, [id]);
}