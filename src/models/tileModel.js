import { execute } from "../database/config.js";

const fieldsToReturn = "t.*, b.\`name\`, b.translatedName, b.category, b.durability, b.baseCost, b.maxUnits, b.removable, b.upgradeable";

// === INSTRUÇÃO: CRIAR === //
export function create(idPark, tileCol, tileRow, idBuilding) {
    const instruction = "INSERT INTO tile(idPark, position_col, position_row, idBuilding) VALUE (?, ?, ?, ?)";
    
    console.log("\n[tileModel.js | create] - Executando INSERT...");
    console.log(`\n[tileModel.js | create] - Instrução: "${instruction}"`);
    
    return execute(instruction, [idPark, tileCol, tileRow, idBuilding]);
}

// === INSTRUÇÃO: ATUALIZAR TIPO === //
export function updateTileType(newIdBuilding, idPark, tileCol, tileRow) {
    const instruction = `
        UPDATE tile 
        SET idBuilding = ${newIdBuilding},
            hp = CASE
                WHEN (SELECT category FROM building WHERE id = ${newIdBuilding}) = "enclosure" THEN 100
                ELSE NULL
            END
        WHERE idPark = ${idPark} AND position_col = ${tileCol} AND position_row = ${tileRow};

        SELECT ${fieldsToReturn} FROM tile t JOIN building b ON t.idBuilding = b.id WHERE idPark = ${idPark} AND position_col = ${tileCol} AND position_row = ${tileRow};
    `;
    
    console.log("\n[tileModel.js | updateTileType] - Executando UPDATE...");
    console.log(`\n[tileModel.js | updateTileType] - Instrução: "${instruction}"`);
    
    return execute(instruction, [newIdBuilding, idPark, tileCol, tileRow]).then(res => res[1]);
}

// === INSTRUÇÃO: BUSCAR TODOS EM UM PARQUE === //
export function getAllTileByParkId(idPark) {
    const instruction = `SELECT ${fieldsToReturn} FROM tile t JOIN building b ON t.idBuilding = b.id WHERE idPark = ?`;
    
    console.log("\n[tileModel.js | getAllTileByParkId] - Executando SELECT...");
    console.log(`\n[tileModel.js | getAllTileByParkId] - Instrução: "${instruction}"`);
    
    return execute(instruction, [idPark]);
}

// === INSTRUÇÃO: BUSCAR POR POSIÇÃO EM UM PARQUE === //
export function getOneTileByParkId(idPark, tileCol, tileRow) {
    const instruction = `SELECT ${fieldsToReturn} FROM tile t JOIN building b ON t.idBuilding = b.id WHERE idPark = ? AND position_col = ? AND position_row = ?`;
    
    console.log("\n[tileModel.js | getOneTileByParkId] - Executando SELECT...");
    console.log(`\n[tileModel.js | getOneTileByParkId] - Instrução: "${instruction}"`);
    
    return execute(instruction, [idPark, tileCol, tileRow]);
}