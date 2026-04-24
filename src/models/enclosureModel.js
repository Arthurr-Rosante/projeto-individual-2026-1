import { execute } from "../database/config.js";

// === INSTRUÇÃO: CRIAR === //
export function create(idTile, durability, hp) {
    const instruction = 
        "INSERT INTO enclosure(idTile, durability, hp) VALUE (?, ?, ?)";

    console.log("\n[enclosureModel.js | create] - Executando INSERT...");
    console.log(`\n[enclosureModel.js | create] - Instrução: "${instruction}"`);

    return execute(instruction, [idTile, durability, hp]);
}

// === INSTRUÇÃO: ATUALIZAR DURABILIDADE === //
export function updateDurability(idEnclosure, durability) {
    const instruction = 
        "UPDATE enclosure SET durability = ? WHERE id = ?";

    console.log("\n[enclosureModel.js | updateDurability] - Executando UPDATE...");
    console.log(`\n[enclosureModel.js | updateDurability] - Instrução: "${instruction}"`);

    return execute(instruction, [durability, idEnclosure]);
}

// === INSTRUÇÃO: ATUALIZAR HP === //
export function updateHP(idEnclosure, hp) {
    const instruction = 
        "UPDATE enclosure SET hp = ? WHERE id = ?";

    console.log("\n[enclosureModel.js | updateHP] - Executando UPDATE...");
    console.log(`\n[enclosureModel.js | updateHP] - Instrução: "${instruction}"`);

    return execute(instruction, [hp, idEnclosure]);
}