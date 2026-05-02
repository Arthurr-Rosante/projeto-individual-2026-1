import { execute } from "../database/config.js";

// === INSTRUÇÃO: CRIAR === //
export function create(idUser, name) {
    // "rating" e "dinoCoins" possuem valores DEFAULT
    const instruction = 
    "INSERT INTO park(idUser, name) VALUE (?, ?)";
    
    console.log("\n[parkModel.js | create] - Executando INSERT...");
    console.log(`\n[parkModel.js | create] - Instrução: "${instruction}"`);
    
    return execute(instruction, [idUser, name]);
}

// === INSTRUÇÃO: ATUALIZAR NOME === //
export function updateName(idPark, newName) {
    const instruction = `
        UPDATE park SET \`name\` = "${newName}" WHERE idUser = ${idPark};
        SELECT * FROM park WHERE idUser = ${idPark};
    `;
    
    console.log("\n[parkModel.js | updateName] - Executando UPDATE...");
    console.log(`\n[parkModel.js | updateName] - Instrução: "${instruction}"`);
    
    return execute(instruction, [newName, idPark]).then(res => res[1]);
}

// === INSTRUÇÃO: ATUALIZAR AVALIAÇÃO === //
export function updateRating(idPark, newRating) {
    const instruction = `
        UPDATE park SET rating = "${newRating}" WHERE idUser = ${idPark};
        SELECT * FROM park WHERE idUser = ${idPark};
    `;
    
    console.log("\n[parkModel.js | updateRating] - Executando UPDATE...");
    console.log(`\n[parkModel.js | updateRating] - Instrução: "${instruction}"`);
    
    return execute(instruction, [newRating, idPark]).then(res => res[1]);
}

// === INSTRUÇÃO: ATUALIZAR QTD. MOEDAS === //
export function updateDinoCoins(idPark, newCoinsCount) {
    const instruction = `
        UPDATE park SET dinoCoins = "${newCoinsCount}" WHERE idUser = ${idPark};
        SELECT * FROM park WHERE idUser = ${idPark};
    `;

    console.log("\n[parkModel.js | updateDinoCoins] - Executando UPDATE...");
    console.log(`\n[parkModel.js | updateDinoCoins] - Instrução: "${instruction}"`);

    return execute(instruction, [newCoinsCount, idPark]).then(res => res[1]);
}

// === INSTRUÇÃO: BUSCA POR ID DO USUÁRIO === //
export function getOneParkById(idUser) {
    const instruction = "SELECT * FROM park WHERE idUser = ?";

    console.log("\n[parkModel.js | getOneParkById] - Executando SELECT...");
    console.log(`\n[parkModel.js | getOneParkById] - Instrução: "${instruction}"`);

    return execute(instruction, [idUser]);
}