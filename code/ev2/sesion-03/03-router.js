// 03-router.js
// Ejemplo: Express.Router() para organizar rutas por módulo

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON en el body
app.use(express.json());

// Importar routers
const usuariosRouter = require('./routes/usuarios');

// Montar router con prefijo /usuarios
// Todas las rutas de usuariosRouter quedan bajo /usuarios
app.use('/usuarios', usuariosRouter);

// Ruta raíz informativa
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API con Express.Router',
    rutas: [
      'GET    /usuarios',
      'GET    /usuarios/:id',
      'POST   /usuarios',
      'DELETE /usuarios/:id',
    ],
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
  console.log('Prueba:');
  console.log('  GET    /usuarios');
  console.log('  GET    /usuarios/1');
  console.log('  POST   /usuarios  (body: { "nombre": "...", "email": "..." })');
  console.log('  DELETE /usuarios/1');
});
