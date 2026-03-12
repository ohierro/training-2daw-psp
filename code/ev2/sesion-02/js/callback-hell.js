// Ejemplo de callback hell
function obtenerDatos(callback) {
  setTimeout(() => callback('datos1'), 500);
}
function procesarDatos(datos, callback) {
  setTimeout(() => callback('datos2'), 500);
}
function guardarDatos(datos, callback) {
  setTimeout(() => callback('datos3'), 500);
}

obtenerDatos((datos1) => {
  procesarDatos(datos1, (datos2) => {
    guardarDatos(datos2, (datos3) => {
      console.log('¡Listo!', datos3);
    });
  });
});
