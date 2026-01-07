// const mysql = require('mysql2/promise');
const { Pool } = require('pg');

const db = new Pool({
    host : process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    database : process.env.POSTGRES_DATABASE,
    password : process.env.POSTGRES_PASSWORD
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