import { execute } from "../database/config.js";

const fieldsToReturn = "t.*, b.\`name\`, b.translatedName, b.category, b.durability, b.baseCost, b.upgradeCost, t.removable, b.upgradeable, b.maxUnits";

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
            maxHp = CASE
                WHEN (SELECT category FROM building WHERE id = ${newIdBuilding}) = "enclosure" THEN 100
                ELSE NULL
            END,
            currentHp = CASE
                WHEN (SELECT category FROM building WHERE id = ${newIdBuilding}) = "enclosure" THEN 100
                ELSE NULL
            END
        WHERE idPark = ${idPark} AND position_col = ${tileCol} AND position_row = ${tileRow};

        SELECT * FROM vw_tiles WHERE idPark = ${idPark};
    `;
    
    console.log("\n[tileModel.js | updateTileType] - Executando UPDATE...");
    console.log(`\n[tileModel.js | updateTileType] - Instrução: "${instruction}"`);
    
    return execute(instruction).then(res => res[1]);
}

// === INSTRUÇÃO: BUSCAR TODOS EM UM PARQUE === //
export function getAllTileByParkId(idPark) {
    const instruction = `SELECT * FROM vw_tiles WHERE idPark = ?`;
    
    console.log("\n[tileModel.js | getAllTileByParkId] - Executando SELECT...");
    console.log(`\n[tileModel.js | getAllTileByParkId] - Instrução: "${instruction}"`);
    
    return execute(instruction, [idPark]);
}

// === INSTRUÇÃO: BUSCAR POR POSIÇÃO EM UM PARQUE === //
export function getOneTileByParkId(idPark, tileCol, tileRow) {
    const instruction = `SELECT * FROM vw_tiles WHERE idPark = ? AND position_col = ? AND position_row = ?`;
    
    console.log("\n[tileModel.js | getOneTileByParkId] - Executando SELECT...");
    console.log(`\n[tileModel.js | getOneTileByParkId] - Instrução: "${instruction}"`);
    
    return execute(instruction, [idPark, tileCol, tileRow]);
}