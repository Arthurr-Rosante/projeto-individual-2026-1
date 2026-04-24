import {execute} from "../database/config.js";

// === INSTRUÇÃO: CRIAR === //
export function create(idEnclosure, idSpecies) {
    const instrucao = 
        "INSERT INTO dinosaur(idEnclosure, idSpecies) VALUE (?, ?)";

    console.log("\n[dinosaurModel.js | create] - Executando INSERT...");
    console.log(`\n[dinosaurModel.js | create] - Instrução: "${instruction}"`);

    return execute(instrucao, [idEnclosure, idSpecies]);
}

// === INSTRUÇÃO: DELETAR === //
export function releaseDinosaur(id) {
    const instrucao = 
        "DELETE FROM dinosaur WHERE id = ?";

    console.log("\n[dinosaurModel.js | releaseDinosaur] - Executando DELETE...");
    console.log(`\n[dinosaurModel.js | releaseDinosaur] - Instrução: "${instruction}"`);

    return execute(instrucao, [id]);
}