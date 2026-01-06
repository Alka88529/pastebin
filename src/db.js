const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host : process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database : process.env.DB_NAME || 'pastebin',
    port: process.env.DB_PORT || 3306,
    password : process.env.DB_PASSWORD || 'Alka@1009'
})


async function ping() {
    const connection = await db.getConnection();
    try {
        await connection.ping();
        console.log('Database connection is healthy');
    } finally {
        connection.release();
    }
}

module.exports = {db, ping };