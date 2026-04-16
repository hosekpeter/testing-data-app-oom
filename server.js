'use strict';

const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

const OOM_MARKER = '/data/oom-marker';

if (!fs.existsSync(OOM_MARKER)) {
    console.log('[run-1] First run — will OOM in 5 seconds');

    app.get('/', (req, res) => {
        res.send('Running — will OOM soon');
    });

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`[run-1] Server running on port ${PORT}`);
    });

    setTimeout(() => {
        console.log('[run-1] Writing marker and allocating memory until OOM kill...');
        fs.writeFileSync(OOM_MARKER, new Date().toISOString());
        const chunks = [];
        while (true) {
            chunks.push(Buffer.alloc(10 * 1024 * 1024, 'x'));
        }
    }, 5000);
} else {
    console.log('[run-2] Restarted after OOM, running normally');

    app.get('/', (req, res) => {
        res.send('OK — running after OOM recovery');
    });

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`[run-2] Server running on port ${PORT}`);
    });
}
