// 05-metodos-http.js
// Ejemplo: API REST completa con GET, POST, PUT, PATCH, DELETE

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// ──────────────────────────────────────────
// Base de datos simulada en memoria
// ──────────────────────────────────────────
let productos = [
  { id: 1, nombre: 'Teclado mecánico', precio: 89.99, stock: 15 },
  { id: 2, nombre: 'Monitor 27"', precio: 299.99, stock: 5 },
  { id: 3, nombre: 'Ratón inalámbrico', precio: 39.99, stock: 30 },
];
let nextId = 4;

// ──────────────────────────────────────────
// GET — obtener datos (idempotente y seguro)
// ──────────────────────────────────────────

// GET /productos          → todos los productos (con filtro opcional)
app.get('/productos', (req, res) => {
  const { nombre } = req.query;
  const resultado = nombre
    ? productos.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()))
    : productos;
  res.json(resultado);
});

// GET /productos/:id      → producto por id
app.get('/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(producto);
});

// ──────────────────────────────────────────
// POST — crear recurso nuevo (no idempotente)
// ──────────────────────────────────────────
app.post('/productos', (req, res) => {
  const { nombre, precio, stock } = req.body;
  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'nombre y precio son obligatorios' });
  }
  const nuevo = { id: nextId++, nombre, precio, stock: stock ?? 0 };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

// ──────────────────────────────────────────
// PUT — reemplazar recurso completo (idempotente)
// ──────────────────────────────────────────
app.put('/productos/:id', (req, res) => {
  const idx = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  const { nombre, precio, stock } = req.body;
  if (!nombre || precio === undefined || stock === undefined) {
    return res.status(400).json({ error: 'PUT requiere todos los campos: nombre, precio, stock' });
  }
  productos[idx] = { id: productos[idx].id, nombre, precio, stock };
  res.json(productos[idx]);
});

// ──────────────────────────────────────────
// PATCH — actualización parcial
// ──────────────────────────────────────────
app.patch('/productos/:id', (req, res) => {
  const idx = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  // Solo actualiza los campos enviados
  productos[idx] = { ...productos[idx], ...req.body };
  res.json(productos[idx]);
});

// ──────────────────────────────────────────
// DELETE — eliminar recurso (idempotente)
// ──────────────────────────────────────────
app.delete('/productos/:id', (req, res) => {
  const idx = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  productos.splice(idx, 1);
  res.status(204).send(); // 204 No Content — sin body
});

// ──────────────────────────────────────────
// HEAD — como GET pero sin body (para verificar existencia)
// ──────────────────────────────────────────
app.head('/productos/:id', (req, res) => {
  const existe = productos.some(p => p.id === parseInt(req.params.id));
  res.status(existe ? 200 : 404).send();
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
  console.log('Prueba con curl:');
  console.log('  GET    /productos');
  console.log('  GET    /productos?nombre=teclado');
  console.log('  GET    /productos/1');
  console.log('  POST   /productos          (body: {"nombre":"Hub USB","precio":19.99,"stock":50})');
  console.log('  PUT    /productos/1        (body: {"nombre":"Teclado","precio":99.99,"stock":10})');
  console.log('  PATCH  /productos/1        (body: {"precio":79.99})');
  console.log('  DELETE /productos/1');
  console.log('  HEAD   /productos/2');
});
