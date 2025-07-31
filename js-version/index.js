import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { checkLetterPresentInDesiredPositionMoreEfficiently, getNumberOfSequences } from './functions.js';
const app = express();
const port = 1234;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './dist')));
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/upload', (req, res) => {
    let chunks = [];
    req.on('data', (chunk) => {
        chunks.push(chunk);
    })
    req.on('end', async () => {
        const fileName = req.headers['x-filename'];
        const filePath = path.join(__dirname, './uploads', fileName);
        console.log(fileName);
        const content = Buffer.concat(chunks);
        fs.writeFileSync(filePath, content);
        const parsed = await getNumberOfSequences(filePath);
        const data = await checkLetterPresentInDesiredPositionMoreEfficiently(filePath);
        res.send({ parsed, data });
    })
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    // if (process.platform === 'darwin') {
    //     exec(`open http://localhost:${port}`);
    // }
    // if (process.platform === 'win32') {
    //     exec(`start http://localhost:${port}`);
    // }
    // else {
    //     exec(`xdg-open http://localhost:${port}`);
    // }
});