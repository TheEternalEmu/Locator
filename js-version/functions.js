import fs from "fs";
import path from "path";
import readline from "readline";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const ILE = "I";
const VAL = "V";
const POSITION = 108;
const FILE = "H5N1_PB2_Example.fasta";
const FILE_PATH = path.join(__dirname, "../", FILE);

export async function getNumberOfSequences(filePath = FILE_PATH) {
    try {
        let data = filePath
        if (typeof filePath === 'string') {
            data = fs.readFileSync(filePath);
        }
        // let data = await fs.readFileSync(filePath);
        if (!data) throw new Error("Something went wrong when reading the file");
        const sequenceLength = data.toString().split('>').length - 1;
        if (sequenceLength === 0) throw new Error("File is empty");
        console.log("Number of sequences:", sequenceLength);
        return sequenceLength
    } catch (error) {
        console.error(error);
    }
}
export function checkLetterPresentInDesiredPosition(filePath = FILE_PATH, letter = VAL, position = POSITION) {
    try {

        console.log(`Reading file at: ${filePath}\n`);
        let rawTextData = filePath
        if (typeof filePath === 'string') {
            rawTextData = fs.readFileSync(filePath);
        }
        if (!rawTextData) throw new Error("Something went wrong while reading the file");
        console.log(`File parsed successfully!\n`);
        const fileLines = rawTextData.toString().split('>').filter(Boolean).map((line) => {
            const splits = line.trim().split('\n')
            const fastaHeader = splits[0].trim();
            const fastaSequence = splits.slice(1).join('').trim();
            const presense = fastaSequence[position].toUpperCase() === letter.toUpperCase();
            return [fastaHeader, fastaSequence, presense];
        });
        console.log(`Sequence parsed successfully!\nResult:\n`);
        return fileLines
    } catch (err) {
        console.error(err);
        return []
    }
}
export async function checkLetterPresentInDesiredPositionMoreEfficiently(filePath = FILE_PATH, letter = VAL, position = POSITION) {
    const results = []
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })
    try {
        let header = ''
        let sequenceChunk = []

        for await (const line of rl) {
            if (line.startsWith('>')) {
                if (header) {
                    const sequence = sequenceChunk.join('')
                    const isCharacterPresent = sequence[position].toUpperCase() === letter.toUpperCase()
                    results.push({
                        header,
                        isCharacterPresent
                    })
                }
                header = line.slice(1).trim()
                sequenceChunk = []
            } else {
                sequenceChunk.push(line.trim())
            }
        }
        return results
    } catch (err) {
        console.error(err);
    }
}