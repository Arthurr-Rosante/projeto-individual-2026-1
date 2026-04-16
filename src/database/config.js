import mysql from "mysql2";

/*
Optei por criar um pool no banco de dados ao invés de utilizar o método padrão 
de conexão em cada uma das queries ao banco, como sugeria a web-data-viz.
*/ 
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

export async function execute(query, params = []) {
    try {
        const [results] = await pool.query(query, params);
        return results;
    } catch (error) {
        console.error("ERRO No MySQL Server: ", error.sqlMessage || error.message);
        throw error;
    }
}