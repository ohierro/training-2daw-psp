export function sum(a, b) {
    return a + b
}

export function div(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero")
    }
    return a / b
}

export function hello() {
    console.log("Hello, world!")

    let a = 5
    let b = 10

    console.log(`The sum of ${a} and ${b} is ${sum(a, b)}, and the division of ${a} by ${b} is ${div(a, b) / 2}`)
}