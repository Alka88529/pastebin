
const { ping } = require('./../db');
const express = require('express');
const router = express.Router();

router.get('/healthz', async (req, res) => {
    try {
        await ping();
        res.status(200).json({ ok: 'true' });
    }catch (error) {
        console.error('Health check failed:', error);
        res.status(500).json({ status: 'Database connection failed' });
    }
})

module.exports = router;