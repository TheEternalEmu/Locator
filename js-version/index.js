const fs = require("fs");
const path = require("path");

const ILE = "I";
const VAL = "V";
const POSITION = 108;
const FILE = "gisaid_epiflu_sequence.fasta";
const TOTAL_SEQ = 0;
const FILE_PATH = path.join(__dirname, "../", FILE);

async function getNumberOfSequences(filePath = FILE_PATH) {
    try {
        const data = await fs.readFileSync(filePath);
        if (!data) throw new Error("Something went wrong when reading the file");
        const sequenceLength = data.toString().split('>').length - 1;
        if (sequenceLength === 0) throw new Error("File is empty");
        console.log("Number of sequences:", sequenceLength);
        return sequenceLength
    } catch (error) {
        console.error(error);
    }
}
async function convertRawFileIntoDataStructure(filePath = FILE_PATH) {
    try {
        const data = await fs.readFileSync(filePath);
        if (!data) throw new Error("Something went wrong when reading the file");
        const lines = data.toString().split('\n');
        console.log(lines.length);
    } catch (err) {
        console.error(err);
    }
}
async function checkLetterPresentInDesiredPosition(filePath = FILE_PATH, letter = VAL, position = POSITION) {
    try {
        console.log(`Reading file at: ${filePath}\n`);
        const rawTextData = await fs.readFileSync(filePath);
        if (!rawTextData) throw new Error("Something went wrong while reading the file");
        console.log(`File parsed successfully!\n`);
        const fileLines = rawTextData.toString().split('>').filter((line) => line !== '').map((line) => {
            const splits = line.split('\n')
            const fastaHeader = splits[0];
            const fastaSequence = splits.slice(1).join('');
            const presense = fastaSequence[position] === letter;
            return [fastaHeader, fastaSequence, presense];
        });
        console.log(`Sequence parsed successfully!\nResult:\n`);
        console.log(fileLines);
        return fileLines
    } catch (err) {
        console.error(err);
    }
}
checkLetterPresentInDesiredPosition();