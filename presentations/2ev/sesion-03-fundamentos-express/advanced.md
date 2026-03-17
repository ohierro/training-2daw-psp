---
marp: true
footer: '2DAM - PSP'
paginate: true
---


## Middlewares personalizados (Parte 1)

Crear middlewares para lógica reutilizable.

```javascript
// Middleware de logging
function logMiddleware(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
}

// Middleware de autenticación
function autenticar(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }
  
  req.usuario = { id: 1, nombre: 'Juan' };
  next();
}
```

---

## Middlewares personalizados (Parte 2)

Otros ejemplos de middlewares útiles.

```javascript
// Middleware de timing
function cronometro(req, res, next) {
  const inicio = Date.now();
  res.on('finish', () => {
    const duracion = Date.now() - inicio;
    console.log(`⏱️  ${req.path} tardó ${duracion}ms`);
  });
  next();
}

// Usar middlewares
app.use(logMiddleware);
app.use(cronometro);
app.get('/publica', (req, res) => {
  res.json({ mensaje: 'Público' });
});
app.get('/privada', autenticar, (req, res) => {
  res.json({ usuario: req.usuario });
});
```

---

## Middlewares de error (Parte 1)

Manejo centralizado de errores.

```javascript
// Middleware de error (4 parámetros)
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  
  res.status(err.status || 500).json({
    error: err.message,
    status: err.status || 500
  });
});
```

**Nota:** Debe ser el último middleware definido

---

## Middlewares de error (Parte 2)

Cómo lanzar errores en rutas.

```javascript
// Pasar error con try/catch
app.get('/datos', (req, res, next) => {
  try {
    const datos = JSON.parse('JSON inválido');
    res.json(datos);
  } catch (error) {
    next(error); // → error handler
  }
});

// Lanzar error directamente
app.get('/usuario/:id', (req, res, next) => {
  if (!req.params.id) {
    const err = new Error('ID requerido');
    err.status = 400;
    return next(err);
  }
  res.json({ id: req.params.id });
});
```

---

## Control de flujo con `next()` (Parte 1)

La función `next()` es crucial para el flujo de middlewares.

```javascript
// next() sin argumentos - continúa
app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

// next(error) - salta a error handler
app.use((req, res, next) => {
  const error = new Error('Error!');
  next(error);
});
```

---

## Control de flujo con `next()` (Parte 2)

Patrones comunes con `next()`.

```javascript
// return next() - detiene ejecución
app.get('/ruta', (req, res, next) => {
  if (!validar()) {
    return next(new Error('Falló'));
  }
  res.json({ ok: true });
});

// Sin next() termina la cadena
app.get('/fin', (req, res) => {
  res.json({ mensaje: 'Final' });
  // Correcto - request terminado
});
```

---

## Validación básica de datos (Parte 1)

Sanitizar y validar input del usuario manualmente.

```javascript
app.use(express.json());

app.post('/registro', (req, res) => {
  const { nombre, email, edad } = req.body;
  
  // Validar campos requeridos
  if (!nombre || !email || !edad) {
    return res.status(400).json({
      error: 'Campos requeridos'
    });
  }
  
  // Validar tipos y formato
  if (typeof nombre !== 'string' || nombre.trim().length === 0) {
    return res.status(400).json({ error: 'Nombre inválido' });
  }
  
  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido' });
  }
  
  if (!Number.isInteger(edad) || edad < 18) {
    return res.status(400).json({ error: 'Mayor de 18 requerido' });
  }
  
  res.status(201).json({ id: 1, nombre, email, edad });
});
```

---

## Validación con Joi (Parte 2)

Usando librería para validación más robusta.

```javascript
const Joi = require('joi');

const esquema = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  edad: Joi.number().integer().min(18).required()
});

app.post('/registro', (req, res) => {
  const { error, value } = esquema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ 
      error: error.details[0].message 
    });
  }
  
  res.status(201).json(value);
});
```