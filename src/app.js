const express = require('express')

const app = express()

app.use(express.json());
require('dotenv').config(); 


// Middleware to parse URL-encoded bodies (optional, for form submissions)
app.use(express.urlencoded({ extended: true }));

const path = require('path');

const healthz = require('./api/healthCheck');
const pastes = require('./api/pates');
const viewPost = require('./api/viewPost');

// Serve static files from the "view" directory
app.use(express.static(path.join(__dirname, 'view')));
app.use('/api/', healthz);
app.use('/api/', pastes);
app.use('/api', viewPost);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


module.exports = app;