// 04-middlewares.js
// Ejemplo: Middlewares globales, de ruta, y ciclo de vida de una solicitud

const express = require('express');
const app = express();
const PORT = 3000;

// ──────────────────────────────────────────
// Middlewares globales (se ejecutan en todas las rutas)
// ──────────────────────────────────────────

// Parsear JSON
app.use(express.json());

// Logger — registra método, ruta y timestamp
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  req.timestamp = timestamp; // añadir dato al objeto request
  next();
});

// Añadir header de versión a todas las respuestas
app.use((req, res, next) => {
  res.set('X-API-Version', '1.0');
  next();
});

// ──────────────────────────────────────────
// Middleware de autenticación (función reutilizable)
// ──────────────────────────────────────────
function verificarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }
  if (token !== 'Bearer secreto123') {
    return res.status(403).json({ error: 'Token inválido' });
  }
  req.usuario = { id: 1, rol: 'admin' };
  next();
}

// ──────────────────────────────────────────
// Rutas
// ──────────────────────────────────────────

app.get('/', (req, res) => {
  res.json({ mensaje: 'Ruta pública', timestamp: req.timestamp });
});

// Ruta protegida: el middleware verificarToken se aplica solo aquí
app.get('/admin', verificarToken, (req, res) => {
  res.json({ mensaje: 'Ruta protegida', usuario: req.usuario });
});

// Ciclo completo con múltiples handlers encadenados
app.get(
  '/ciclo',
  (req, res, next) => {
    console.log('  → Handler 1: validando...');
    req.datos = { paso: 1 };
    next();
  },
  (req, res, next) => {
    console.log('  → Handler 2: procesando...');
    req.datos.paso = 2;
    next();
  },
  (req, res) => {
    console.log('  → Handler 3: respondiendo');
    res.json({ resultado: 'OK', datos: req.datos });
  },
);

// Middleware de manejo de errores (4 parámetros)
app.use((err, req, res, next) => {
  console.error('Error capturado:', err.message);
  res.status(500).json({ error: err.message });
});

// ──────────────────────────────────────────
// 404 — debe ser el último middleware
// ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.path} no encontrada` });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
  console.log('Prueba:');
  console.log('  GET /              → ruta pública');
  console.log('  GET /admin         → 401 (sin token)');
  console.log('  GET /admin         → con header: Authorization: Bearer secreto123');
  console.log('  GET /ciclo         → múltiples handlers');
  console.log('  GET /no-existe     → 404');
});
