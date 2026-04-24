import { execute } from "../database/config.js";

// === INSTRUÇÃO: CRIAR === //
export function create(idPark, idBuilding, position_col, position_row) {
    const instruction =
        "INSERT INTO tile(idPark, idBuilding, position_col, position_row) VALUE (?, ?, ?, ?)";
    
    console.log("\n[tileModel.js | create] - Executando INSERT...");
    console.log(`\n[tileModel.js | create] - Instrução: "${instruction}"`);
    
    return execute(instruction, [idPark, idBuilding, position_col, position_row]);
}

// === INSTRUÇÃO: ATUALIZAR TIPO === //
export function updateBuildingType(idTile, newIdBuilding) {
    const instruction =
        "UPDATE tile SET idBuilding = ? WHERE id = ?";
    
    console.log("\n[tileModel.js | updateBuildingType] - Executando UPDATE...");
    console.log(`\n[tileModel.js | updateBuildingType] - Instrução: "${instruction}"`);
    
    return execute(instruction, [newIdBuilding, idTile]);
}

// === INSTRUÇÃO: BUSCAR TODOS === //
export function getAll() {
    const instruction = "SELECT * FROM tile";
    
    console.log("\n[tileModel.js | getAll] - Executando SELECT...");
    console.log(`\n[tileModel.js | getAll] - Instrução: "${instruction}"`);
    
    return execute(instruction);
}

// === INSTRUÇÃO: BUSCAR POR ID === //
export function getById(id) {
    const instruction = "SELECT * FROM tile WHERE id = ?";
    
    console.log("\n[tileModel.js | getAll] - Executando SELECT...");
    console.log(`\n[tileModel.js | getAll] - Instrução: "${instruction}"`);
    
    return execute(instruction, [id]);
}