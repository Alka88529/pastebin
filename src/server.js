const express = require('express');
const app = require('/app')
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const port = 3000;

// Connect to SQLite database
const dbPath = path.join(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Example query to create a table (if it doesn't exist)
db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
)`, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Table "posts" is ready');
    }
});

app.listen(port,() =>{
    console.log(`server started ${port}`)
})

// Export the database connection for use in other modules
module.exports = db;
