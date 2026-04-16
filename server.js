'use strict';

const express = require('express');
const app = express();
const PORT = 3000;

console.log('[app] Starting — will consume all memory in 5 seconds');

app.get('/', (req, res) => {
    res.send('Running — will OOM soon');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`[app] Server running on port ${PORT}`);
});

setTimeout(() => {
    console.log('[app] Allocating memory until OOM kill...');
    const chunks = [];
    while (true) {
        chunks.push(Buffer.alloc(10 * 1024 * 1024, 'x'));
    }
}, 5000);
