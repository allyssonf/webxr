const express = require("express");
const path = require('path');
const https = require('https');
const fs = require('fs');

const root = __dirname;

const app = express();

app.use(express.static(root));

app.get("/", (req, res) => {
    res.sendFile(path.join(root, 'webxr.html'));
});

if (process.env.NODE_ENV === 'development') {
    console.log('development');

    https.createServer({
        key: fs.readFileSync('./cert/key.pem'),
        cert: fs.readFileSync('./cert/cert.pem')
    }, app).listen(4000);    
} else {
    app.listen(4000, '0.0.0.0', (err) => {
        console.log('Listening!');
    });
}
