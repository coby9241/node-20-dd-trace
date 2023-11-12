'use strict';

import './tracer/index.js'; // must come before importing any instrumented module.

import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json())

// add slow endpoint
app.post('/slow', async (req, res) => {
    const slowReq = axios.create({
        baseURL: `https://postman-echo.com`,
        headers: {
            'Content-Type': 'application/json'
        },
    });
    await slowReq.get(`/delay/${req.body.delay}`);
    return res.status(200).json({"success": true});
});

app.listen(3000, () => {
    console.log('listening on port 3000...')
});
