// Ejemplo de Promise
const miPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('¡Éxito!');
  }, 1000);
});

console.log(miPromise); // Promise { <pending> }
