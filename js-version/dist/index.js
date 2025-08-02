const fileInput = document.getElementById('fileInput')
const searchbar = document.getElementById('searchbar')
const resultantData = []
const elementsWithID = Array.from(document.querySelectorAll('[id]'))
const dom = {}

elementsWithID.forEach((element) => {
    dom[element.id] = element
})
console.log(dom)
const resultsDiv = document.getElementById('results')

searchbar.addEventListener('input', (e) => {
    resultsDiv.innerHTML = ''
    resultantData.filter((data) => {
        return data.header.toLowerCase().includes(e.target.value.toLowerCase())
    }).forEach(showResults)
})
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
        document.getElementById('button').classList.add('active')
    } else {
        document.getElementById('button').classList.remove('active')
    }
})
function showResults(data) {
    const parent = document.createElement('div')
    parent.classList.add('resultant')
    const header = document.createElement('h4')
    header.innerText = data.header
    const isCharacterPresent = document.createElement('p')
    isCharacterPresent.innerText = data.isCharacterPresent ? "Present" : "Not Present"
    isCharacterPresent.classList[data.isCharacterPresent ? "add" : "remove"]('present')
    parent.appendChild(header)
    parent.appendChild(isCharacterPresent)
    resultsDiv.appendChild(parent)
}
function sortByPresent() {
    resultantData.sort((a, b) => {
        if (a.isCharacterPresent && !b.isCharacterPresent) return -1
        if (!a.isCharacterPresent && b.isCharacterPresent) return 1
        return 0
    })
    resultsDiv.innerHTML = ''
    resultantData.forEach(showResults)
}
async function upload() {
    const file = fileInput.files[0];
    if (!file) return
    const data = await fetch('/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'X-Filename': file.name
        },
        body: file
    })
    const parsed = await data.json()
    for (let i = 0; i < parsed.data.length; i++) {
        showResults(parsed.data[i])
        resultantData.push(parsed.data[i])
    }
}   