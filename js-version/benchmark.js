import { checkLetterPresentInDesiredPosition, checkLetterPresentInDesiredPositionMoreEfficiently } from "./functions.js"
async function benchmark(f,name){
    console.time(name)
    f()
    console.timeEnd(name)
}
benchmark(() => checkLetterPresentInDesiredPosition(),"checkLetterPresentInDesiredPosition")
benchmark(() => checkLetterPresentInDesiredPositionMoreEfficiently(), "checkLetterPresentInDesiredPositionMoreEfficiently")