// 02-rutas.js
// Ejemplo: Parámetros de ruta, query string y orden de rutas

const express = require('express');
const app = express();
const PORT = 3000;

// ──────────────────────────────────────────
// Parámetros de ruta (:param)
// ──────────────────────────────────────────

// Parámetro simple
// GET /usuarios/42
app.get('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  res.json({ usuario: `Usuario con id: ${id}` });
});

// Múltiples parámetros
// GET /usuarios/1/posts/5
app.get('/usuarios/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// ──────────────────────────────────────────
// IMPORTANTE: rutas específicas ANTES que dinámicas
// ──────────────────────────────────────────

// ✅ 'activos' se define ANTES de ':id'
app.get('/productos/activos', (req, res) => {
  res.json({ tipo: 'activos', productos: ['A', 'B'] });
});

app.get('/productos/inactivos', (req, res) => {
  res.json({ tipo: 'inactivos', productos: [] });
});

// Ruta dinámica al final
app.get('/productos/:id', (req, res) => {
  res.json({ productoId: req.params.id });
});

// ──────────────────────────────────────────
// Query string (?clave=valor)
// ──────────────────────────────────────────

// GET /buscar?q=javascript&limite=20&pagina=2
app.get('/buscar', (req, res) => {
  const { q, limite = 10, pagina = 1 } = req.query;
  res.json({ busqueda: q, limite, pagina });
});

// Combinando ruta dinámica + query
// GET /articulos/42/comentarios?ordenar=asc&limite=5
app.get('/articulos/:id/comentarios', (req, res) => {
  const { id } = req.params;
  const { ordenar = 'desc', limite = 10 } = req.query;
  res.json({ articuloId: id, ordenar, limite, comentarios: [] });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
  console.log('Prueba:');
  console.log('  GET /usuarios/42');
  console.log('  GET /usuarios/1/posts/5');
  console.log('  GET /productos/activos');
  console.log('  GET /productos/123');
  console.log('  GET /buscar?q=node&limite=5');
  console.log('  GET /articulos/10/comentarios?ordenar=asc');
});
