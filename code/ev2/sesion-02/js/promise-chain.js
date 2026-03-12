// Encadenamiento con .then(), .catch(), .finally()
fetch('https://api.example.com/datos')
  .then(response => response.json())
  .then(datos => console.log('Datos:', datos))
  .catch(error => console.error('Error:', error))
  .finally(() => console.log('Operación completada'));
