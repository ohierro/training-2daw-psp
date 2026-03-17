// 01-servidor-basico.js
// Ejemplo: Servidor Express mínimo, respuestas y configuración de puerto

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Ruta raíz — texto plano
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Respuesta JSON
app.get('/json', (req, res) => {
  res.json({ usuario: 'Juan', edad: 30 });
});

// Respuesta HTML
app.get('/html', (req, res) => {
  res.send('<h1>Página de inicio</h1><p>Bienvenido a Express</p>');
});

// Respuesta con código de estado personalizado
app.get('/creado', (req, res) => {
  res.status(201).json({ mensaje: 'Recurso creado' });
});

// Redirección
app.get('/redirigir', (req, res) => {
  res.redirect('/json');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  console.log('Rutas disponibles:');
  console.log('  GET /        → texto plano');
  console.log('  GET /json    → JSON');
  console.log('  GET /html    → HTML');
  console.log('  GET /creado  → 201 Created');
  console.log('  GET /redirigir → redirige a /json');
});
