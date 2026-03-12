// const { sum, div } = require('./math')
// const math = require('./math')
import { sum, div } from './math_es.js'
import { open } from 'node:fs/promises';


function hello() {
    console.log("Hello, world!")

    let a = 5
    let b = 10

    console.log(`The sum of ${a} and ${b} is ${sum(a, b)}, and the division of ${a} by ${b} is ${div(a, b) / 2}`)
}

function readFile() {
    open('./sample.txt')
        .then(fileHandle => {
            console.log(`File opened successfully: ${fileHandle.path}`)
            return fileHandle.readFile('utf-8')
        })
        .then(content => {
            // console.log(`File content:\n${content}`)
            content.split('\n').forEach((line, index) => {
                console.log(`Line ${index + 1}: ${line}`)
            })
        })
        .catch(err => {
            console.error(`Error reading file: ${err.message}`)
        })
}

console.log(`Directorio actual ${ process.cwd() }`)
console.log(`Parametro de entorno ${ process.env.NODE_ENV }`)
console.log(`Argumentos de la linea de comandos ${ process.argv }`)

hello()
readFile()