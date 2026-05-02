import { execute } from "../database/config.js";

// === INSTRUÇÃO: CRIAR === //
export function create(idPark, tileCol, tileRow, idBuilding) {
    const instruction = "INSERT INTO tile(idPark, position_col, position_row, idBuilding) VALUE (?, ?, ?, ?)";
    
    console.log("\n[tileModel.js | create] - Executando INSERT...");
    console.log(`\n[tileModel.js | create] - Instrução: "${instruction}"`);
    
    return execute(instruction, [idPark, tileCol, tileRow, idBuilding]);
}

// === INSTRUÇÃO: ATUALIZAR TIPO === //
export function updateTileType(newIdBuilding, idPark, tileCol, tileRow) {
    const instruction = "UPDATE tile SET idBuilding = ? WHERE idPark = ? AND position_col = ? AND position_row = ?";
    
    console.log("\n[tileModel.js | updateTileType] - Executando UPDATE...");
    console.log(`\n[tileModel.js | updateTileType] - Instrução: "${instruction}"`);
    
    return execute(instruction, [newIdBuilding, idPark, tileCol, tileRow]);
}

// === INSTRUÇÃO: BUSCAR TODOS EM UM PARQUE === //
export function getAllTileByParkId(idPark) {
    const instruction = "SELECT t.*, b.`name`, b.category FROM tile t JOIN building b ON t.idBuilding = b.id WHERE idPark = ?";
    
    console.log("\n[tileModel.js | getAllTileByParkId] - Executando SELECT...");
    console.log(`\n[tileModel.js | getAllTileByParkId] - Instrução: "${instruction}"`);
    
    return execute(instruction, [idPark]);
}

// === INSTRUÇÃO: BUSCAR POR POSIÇÃO EM UM PARQUE === //
export function getOneTileByParkId(idPark, tileCol, tileRow) {
    const instruction = "SELECT t.*, b.`name`, b.category FROM tile t JOIN building b ON t.idBuilding = b.id WHERE idPark = ? AND position_col = ? AND position_row = ?";
    
    console.log("\n[tileModel.js | getOneTileByParkId] - Executando SELECT...");
    console.log(`\n[tileModel.js | getOneTileByParkId] - Instrução: "${instruction}"`);
    
    return execute(instruction, [idPark, tileCol, tileRow]);
}