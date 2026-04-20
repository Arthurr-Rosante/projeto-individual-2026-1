import mysql from "mysql2";

const mysqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};

export function execute(query, params = []) {
    if(process.env.AMBIENTE_PROCESSO !== 'producao' || process.env.AMBIENTE_PROCESSO !== 'desenvolvimento') {
        console.error("\n[config.js] Error: Não foi possível definir o Ambiente (producao OU desenvolvimento)\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(() => {
        let connection = mysql.createConnection(mysqlConfig);

        connection.connect();
        connection.query(query, params, (err, results) => {
            connection.end();
            if(err) reject(err);

            console.log(results);
            resolve(results);
        });

        connection.on("error", (err) => {
            return ("ERRO NO MySQL SERVER: ", err.sqlMessage);
        })
    });
}


/*
// === VERSÃO SUGERIDA === //

// Optei por criar um pool no banco de dados ao invés de utilizar o método padrão 
// de conexão em cada uma das queries ao banco, como sugeria a web-data-viz.

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    waitForConnections: true,   // habilita fila de espera ao invés de lançar erro
    connectionLimit: 10,        // máximo de conexões simultâneas
    maxIdle: 10,                // máximo de conexões inativas
    idleTimeout: 60000,         // tempo máximo de inatividade (1min)
    queueLimit: 0               // limite da fila de conexões (0 = fila infinita)
});

export function execute(query, params = []) {
    try {
        const [results] = pool.query(query, params);
        return results;
    } catch (error) {
        console.error("ERRO No MySQL Server: ", error.sqlMessage || error.message);
        throw error;
    }
}
*/ 