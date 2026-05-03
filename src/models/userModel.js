import { execute } from "../database/config.js";

const allowedFields = "id, username, email, createdAt, updatedAt";

// === INSTRUÇÃO: REGISTRAR === //
export function register(username, email, password) {
    const instruction = `
    -- 1. CRIAR USUÁRIO
    INSERT INTO \`user\`(username, email, \`password\`)
        VALUE('${username}', '${email}', '${password}');

    -- 2. CRIAR PARQUE ATRELADO AO USUÁRIO CRIADO
    INSERT INTO park(idUser, name) 
        SELECT id, CONCAT('Parque de ', '${username}') 
        FROM \`user\`
    WHERE email = '${email}';

    -- 3. CRIAR GRID(5x4) DE TILES ATRELADOS AO PARQUE CRIADO
    INSERT INTO tile(idPark, position_col, position_row, idBuilding)
    VALUES
        -- Row 0
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 0, 0, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 1, 0, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 2, 0, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 3, 0, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 4, 0, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        -- Row 1
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 0, 1, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 1, 1, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 2, 1, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 3, 1, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 4, 1, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        -- Row 2
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 0, 2, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 1, 2, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 2, 2, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 3, 2, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 4, 2, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        -- Row 3
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 0, 3, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 1, 3, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 2, 3, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 3, 3, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1)),
        ((SELECT id FROM \`user\` WHERE email = '${email}'), 4, 3, (SELECT id FROM building WHERE category = "terrain" ORDER BY RAND() LIMIT 1));

    -- 4. POPULAR GRID EM POSIÇÕES PREDEFINIDAS COM CONSTRUÇÕES ESPECÍFICAS
    UPDATE tile	
    SET idBuilding = 12
    WHERE idPark = (SELECT id FROM \`user\` WHERE email = '${email}')			-- PORTÃO DE ENTRADA
        AND position_col = 4 AND position_row = 0;
        
    UPDATE tile	
    SET idBuilding = 13
    WHERE idPark = (SELECT id FROM \`user\` WHERE email = '${email}')			-- CENTRO DE VISITANTES
        AND position_col = 0 AND position_row = 1;

    UPDATE tile	
    SET idBuilding = 14
    WHERE idPark = (SELECT id FROM \`user\` WHERE email = '${email}')			-- LABORATÓRIO
        AND position_col = 0 AND position_row = 2;

    UPDATE tile	
    SET idBuilding = 9, hp = 100
    WHERE idPark = (SELECT id FROM \`user\` WHERE email = '${email}')			-- CERCADO NÍVEL 1
        AND position_col = 3 AND position_row = 2;

    -- 5. UM DINOSSAURO PADRÃO
    INSERT INTO dinosaur(idPark, tile_col, tile_row, idSpecies)
    SELECT
        (SELECT id FROM \`user\` WHERE email = '${email}'),
        3,
        2,
        (SELECT id FROM species WHERE \`name\` = "parassaurolofo");
    `;
    
    console.log("\n[userModel.js | register] - Executando INSERT...");
    console.log(`\n[userModel.js | register] - Instrução: "${instruction}"`);
    
    return execute(instruction, [username, email, password]);
}

// === INSTRUÇÃO: AUTENTICAR === //
export function authenticate(email, password) {
    const whereCondition = `email = "${email}" AND password = "${password}"`;

    const instruction = `
        -- 1. Seleciona Usuário
        SELECT * FROM user WHERE ${whereCondition};

        -- 2. Seleciona Parque
        SELECT * FROM park WHERE idUser = (SELECT id FROM user WHERE ${whereCondition});
        
        -- 2. Seleciona Tiles do Parque
        SELECT 
            t.idPark, t.position_col, t.position_row, b.\`name\`, b.translatedName, b.category, 
            b.durability, b.baseCost, b.maxUnits, b.removable, b.upgradeable
        FROM tile t 
        JOIN building b ON t.idBuilding = b.id 
        WHERE idPark = (SELECT id FROM user WHERE ${whereCondition})
        ORDER BY t.position_row;

        SELECT 
            d.*, s.name, s.aggressiveness 
        FROM dinosaur d 
        JOIN species s ON d.idSpecies = s.id 
        WHERE idPark = (SELECT id FROM user WHERE ${whereCondition});
    `;
    
    console.log("\n[userModel.js | authenticate] - Executando SELECT...");
    console.log(`\n[userModel.js | authenticate] - Instrução: "${instruction}"`);
    
    return execute(instruction).then(res => {
        return {
            user: res[0][0],
            park: res[1][0],
            tiles: res[2],
            dinosaur: res[3]
        }
    });
}

// === INSTRUÇÃO: PROCURAR POR EMAIL === //
export function getByEmail(email) {
    const instruction = 
    `SELECT ${allowedFields} FROM user WHERE email = ?`;
    
    console.log("\n[userModel.js | getByEmail] - Executando SELECT...");
    console.log(`\n[userModel.js | getByEmail] - Instrução: "${instruction}"`);
    
    return execute(instruction, [email]);
}