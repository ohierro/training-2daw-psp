// Ejemplo async/await
async function obtenerDatos() {
  try {
    const response = await fetch('https://api.example.com/datos');
    const datos = await response.json();
    console.log('Datos:', datos);
    return datos;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    console.log('Operación completada');
  }
}

obtenerDatos();
