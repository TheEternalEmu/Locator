import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkLetterPresentInDesiredPosition, getNumberOfSequences } from './functions.js';
const app = express();
const port = 1234;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
        </head>
        <body>
        <h1>Upload Your File</h1>
        <input type="file" id="fileInput" accept=".fasta" required/>
        <button onclick="upload()">Upload</button>
        <script>
          function upload() {
                const file = document.getElementById('fileInput').files[0];
                fetch('/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'X-Filename': file.name
                },
                body: file
                })
                .then(res => res.json())
                .then(console.log);
        }
        </script>
        </body>
        </html>
        `)
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
        const data = await checkLetterPresentInDesiredPosition(filePath);
        res.send({parsed, data});
    })
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});