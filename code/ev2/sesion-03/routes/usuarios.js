// routes/usuarios.js
// Router de usuarios — se monta en la app principal con un prefijo

const express = require('express');
const router = express.Router();

// Base de datos simulada en memoria
const usuarios = [
  { id: 1, nombre: 'Ana García', email: 'ana@example.com' },
  { id: 2, nombre: 'Luis Pérez', email: 'luis@example.com' },
];

// GET /usuarios
router.get('/', (req, res) => {
  res.json(usuarios);
});

// GET /usuarios/:id
router.get('/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json(usuario);
});

// POST /usuarios
router.post('/', (req, res) => {
  const { nombre, email } = req.body;
  const nuevo = { id: usuarios.length + 1, nombre, email };
  usuarios.push(nuevo);
  res.status(201).json(nuevo);
});

// DELETE /usuarios/:id
router.delete('/:id', (req, res) => {
  const idx = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  usuarios.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;
