import {execute} from "../database/config.js";

// === INSTRUÇÃO: CRIAR === //
export function create(idPark, tileCol, tileRow, idSpecies) {
    const instruction = "INSERT INTO dinosaur(idPark, tile_col, tile_row, idSpecies) VALUE (?, ?, ?, ?)";

    console.log("\n[dinosaurModel.js | create] - Executando INSERT...");
    console.log(`\n[dinosaurModel.js | create] - Instrução: "${instruction}"`);

    return execute(instruction, [idPark, tileCol, tileRow, idSpecies]);
}

// === INSTRUÇÃO: DELETAR === //
export function releaseDinosaur(idPark, tileCol, tileRow) {
    const instruction = "DELETE FROM dinosaur WHERE idPark = ? AND tile_col = ? AND tile_row = ?";

    console.log("\n[dinosaurModel.js | releaseDinosaur] - Executando DELETE...");
    console.log(`\n[dinosaurModel.js | releaseDinosaur] - Instrução: "${instruction}"`);

    return execute(instruction, [idPark, tileCol, tileRow]);
}

// === INSTRUÇÃO: BUSCAR TODOS EM UM PARQUE === //
export function getAllDinosaurByParkId(idPark) {
    const instruction = "SELECT d.*, s.name FROM dinosaur d JOIN species s ON d.idSpecies = s.id WHERE idPark = ?";

    console.log("\n[dinosaurModel.js | getAllDinosaurByParkId] - Executando SELECT...");
    console.log(`\n[dinosaurModel.js | getAllDinosaurByParkId] - Instrução: "${instruction}"`);

    return execute(instruction, [idPark]);
}

// === INSTRUÇÃO: BUSCAR ESPECÍFICO EM UM PARQUE === //
export function getOneDinosaurByParkId(idPark, tileCol, tileRow) {
    const instruction = "SELECT d.*, s.name FROM dinosaur d JOIN species s ON d.idSpecies = s.id WHERE idPark = ? AND tile_col = ? AND tile_row = ?";

    console.log("\n[dinosaurModel.js | getOneDinosaurByParkId] - Executando SELECT...");
    console.log(`\n[dinosaurModel.js | getOneDinosaurByParkId] - Instrução: "${instruction}"`);

    return execute(instruction, [idPark, tileCol, tileRow]);
}