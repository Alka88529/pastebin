const express = require('express');
const router = express.Router();
const {db} = require('../db');
const {getCurrentTimestamp} = require('../utils/utils');

router.post('/pastes', async (req, res) => {
    const {content, ttl_seconds, max_views} = req.body;
    if(!content) {
        return res.status(400).json({error: 'Content is required'});
    }
    if(ttl_seconds != null && (ttl_seconds <= 0 || isNaN(ttl_seconds))) {
        return res.status(400).json({error: 'ttl_seconds must be a number and greater than 0'});
    }
    if(max_views != null && (isNaN(max_views) || max_views <= 0)) {
        return res.status(400).json({error: 'max_views must be a number and greater than 0'});
    }
    const query = 'INSERT INTO posts (content, ttl_seconds, max_views) VALUES ($1, $2, $3)';
    try{
        const row = await db.query(query, [content, ttl_seconds || null, max_views || null]);
        const result = row.rows[0]
        console.log('Paste saved with ID:', result);
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        res.status(201).json({id: result.id, url: `${baseUrl}/p/${result.id}`});
    }catch (error) {
        console.error('Error inserting paste:', error);
        return res.status(500).json({error: 'save failed error'+error});
    }
    
})

router.get('/pastes/:id', async (req, res) => {
    const pasteId = req.params.id;
    const query = 'SELECT * FROM posts WHERE id = $1';  
    const updateQuery = 'UPDATE posts SET max_views = max_views - 1 WHERE id = $1 AND max_views IS NOT NULL AND max_views > 0'; 

    try {
        const result = await db.query(query, [pasteId]);
        const rows = result.rows;
        if (rows.length === 0) {
            return res.status(404).json({error: 'Paste not found'});
        }
        const content = rows[0].content;
        const ttl_seconds = rows[0].ttl_seconds;
        const max_views = rows[0].max_views;
        const created_at = rows[0].createdAt;
        if (rows.length === 0) {
            return res.status(404).send('Post not found');
        }
        if (rows[0].max_views != null && rows[0].max_views === 0) {
            return res.status(404).send('Paste has expired due to max views reached');
        }
        const now = new Date();
        const expires_at = ttl_seconds ? getCurrentTimestamp(req) + ttl_seconds * 1000 : null;
        console.log('Expires at:', getCurrentTimestamp());
        if (rows[0].ttl_seconds != null && now > new Date(expires_at)) {
            return res.status(404).send('Paste has expired');
        }
        console.log('Fetched paste:', rows[0]);
        console.log('Created at:', new Date(created_at).getTime());
        const updatedData = await db.query(updateQuery, [pasteId]);
        res.status(200).json({content, remaining_views:max_views-1, expires_at});
    } catch (error) {
        console.error('Error fetching paste:', error);
        return res.status(500).json({error: 'fetch failed'});
    }
});

module.exports = router;
