import { execute } from "../database/config.js";

// === INSTRUÇÃO: CRIAR === //
export function create(idUser, parkName) {
    // "rating" e "dinoCoins" possuem valores DEFAULT
    const instruction = 
    "INSERT INTO park(idUser, name) VALUE (?, ?)";
    
    console.log("\n[parkModel.js | create] - Executando INSERT...");
    console.log(`\n[parkModel.js | create] - Instrução: "${instruction}"`);
    
    return execute(instruction, [idUser, parkName]);
}

// === INSTRUÇÃO: ATUALIZAR NOME === //
export function updateName(idPark, newName) {
    const instruction = 
    "UPDATE park SET name = ? WHERE id = ?";
    
    console.log("\n[parkModel.js | updateName] - Executando UPDATE...");
    console.log(`\n[parkModel.js | updateName] - Instrução: "${instruction}"`);
    
    return execute(instruction, [parkName, idPark]);
}

// === INSTRUÇÃO: ATUALIZAR AVALIAÇÃO === //
export function updateRating(idPark, newRating) {
    const instruction = 
    "UPDATE park SET rating = ? WHERE id = ?";
    
    console.log("\n[parkModel.js | updateRating] - Executando UPDATE...");
    console.log(`\n[parkModel.js | updateRating] - Instrução: "${instruction}"`);
    
    return execute(instruction, [newRating, idPark]);
}

// === INSTRUÇÃO: ATUALIZAR QTD. MOEDAS === //
export function updateDinoCoins(idPark, newCoinsCount) {
    const instruction = 
        "UPDATE park SET dinoCoins = ? WHERE id = ?";

    console.log("\n[parkModel.js | updateDinoCoins] - Executando UPDATE...");
    console.log(`\n[parkModel.js | updateDinoCoins] - Instrução: "${instruction}"`);

    return execute(instruction, [newCoinsCount, idPark]);
}