// const mysql = require('mysql2/promise');
const { Pool } = require('pg');

const db = new Pool({
    host : process.env.POSTGRES_HOST || 'localhost',
    user: process.env.POSTGRES_USER || 'root',
    database : process.env.POSTGRES_DATABASE || 'pastebin',
    port: process.env.POSTGRES_PORT || 5432,
    password : process.env.POSTGRES_PASSWORD || 'Alka@1009'
})


async function ping() {
    const connection = await db.connect();
    try {
        await connection.query('SELECT 1');
        console.log('Database connection is healthy');
    } finally {
        connection.release();
    }
}

module.exports = {db, ping };