// Ejemplo de Promise
const miPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(['¡Éxito!', 5]);
    // reject('¡Error!');
  }, 1000);
});

console.log(miPromise); // Promise { <pending> }

// Ejemplo de uso de then, catch y finally
miPromise.then(function (resultado) {
  console.log(resultado[0]); // ¡Éxito!
  console.log(resultado[1]); // 5
}).catch((error) => {
  console.error(error);
}).finally(() => {
  console.log('Promesa finalizada');
});

console.log('Esto se ejecuta antes de que la promesa se resuelva');