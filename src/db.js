// const mysql = require('mysql2/promise');
const { Pool } = require('pg');

const db = new Pool({
    connectionString: process.env.POSTGRES_URL,
    
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