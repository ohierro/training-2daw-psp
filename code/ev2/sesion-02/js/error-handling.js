// Manejo de errores en código asincrónico
async function operacion() {
  try {
    const resultado = await operacionRiesgosa();
    return resultado;
  } catch (error) {
    console.error('Error capturado:', error.message);
    throw new Error('Operación fallida');
  }
}

// Con .catch()
fetch('/datos')
  .then(res => res.json())
  .catch(err => console.error('Error en fetch:', err));
