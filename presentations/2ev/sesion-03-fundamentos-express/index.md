---
marp: true
footer: '2DAM - PSP'
paginate: true
---

# Sesión 3: Fundamentos de Express

---

## Objetivos de Aprendizaje

- Crear servidores web con **Express.js**
- Dominar el sistema de **routing** y parámetros
- Entender y trabajar con **middlewares**
- Implementar métodos HTTP (GET, POST, PUT, DELETE)
- Manejo de solicitudes y respuestas JSON

---

# Servidor HTTP Básico

Cómo crear un servidor funcional con Express

---

## Instalación de Express

Express es un framework minimalista pero poderoso para crear aplicaciones web en Node.js.

```bash
# Crear proyecto
mkdir mi-app-express
cd mi-app-express
npm init -y

# Instalar Express
npm install express

# Para desarrollo (nodemon reinicia servidor automáticamente)
npm install --save-dev nodemon
```
---

**package.json con scripts:**
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

---

## Creación básica de una aplicación Express

El servidor más simple en Express requiere solo pocas líneas.

```javascript
// index.js
const express = require('express');
const app = express();

// Definir ruta
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Escuchar en un puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
```
---

**Ejecutar:**
```bash
npm run dev
```

Acceder a `http://localhost:3000` muestra `¡Hola, mundo!`

---

## Escucha en puertos específicos

Configuración de puertos y cómo manejar diferentes entornos.

```javascript
const express = require('express');
const app = express();

// Usar puerto de variable de entorno o valor por defecto
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor funcionando' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor en puerto ${PORT}`);
});
```
---
**Ejecutar con puerto personalizado:**
```bash
PORT=8080 npm run dev
```

**Buenas prácticas:**
- Usar variables de entorno para configuración
- Documentar puerto por defecto
- Permitir configuración externa

---

## Respuestas básicas (Parte 1)

Express proporciona varios métodos para enviar respuestas.

```javascript
app.get('/texto', (req, res) => {
  res.send('Respuesta de texto');
});

app.get('/html', (req, res) => {
  res.send('<h1>HTML válido</h1>');
});

app.get('/json', (req, res) => {
  res.json({ usuario: 'Juan', edad: 30 });
});
```

---

**Métodos básicos:**
- `res.send()` – texto, HTML, JSON
- `res.json()` – siempre JSON
- `res.status()` – establecer código HTTP

---

## Respuestas básicas (Parte 2)

Continuación de métodos de respuesta.

```javascript
app.get('/status', (req, res) => {
  res.status(201).json({ mensaje: 'Recurso creado' });
});

app.get('/descarga', (req, res) => {
  res.download('./archivo.pdf');
});

app.get('/redirigir', (req, res) => {
  res.redirect('/nueva-url');
});
```

--- 

**Métodos especiales:**
- `res.status()` – establecer código HTTP
- `res.download()` – descargar archivo
- `res.redirect()` – redireccionar

---

## Ciclo de vida de una solicitud

Cómo fluye una solicitud a través de Express.

```
1. Cliente envía solicitud HTTP (GET/POST/etc)
    ↓
2. Express recibe la solicitud
    ↓
3. Pasa por middlewares en orden
    ↓
4. Encuentra ruta coincidente
    ↓
5. Ejecuta handler (controlador)
    ↓
6. Envía respuesta al cliente
    ↓
7. Conexión se cierra (o persiste si HTTP/2)
```

---

## Ciclo de vida: Ejemplo con logging

```javascript
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

app.get('/usuario', (req, res) => {
  console.log('👤 Procesando solicitud');
  res.json({ id: 1 });
});

app.use((req, res, next) => {
  console.log(`📤 Respuesta enviada`);
  next();
});
```

---

# Sistema de Rutas (Routing)

Cómo definir rutas y manejar parámetros

---

## Métodos HTTP: GET, POST, PUT, DELETE


```javascript
// GET – obtener datos (sin efectos secundarios)
app.get('/usuarios', (req, res) => {
  res.json([{ id: 1, nombre: 'Juan' }]);
});
// POST – crear nuevo recurso
app.post('/usuarios', (req, res) => {
  const nuevoUsuario = req.body;
  res.status(201).json(nuevoUsuario);
});
// PUT – actualizar recurso completo
app.put('/usuarios/:id', (req, res) => {
  // ..
});
// DELETE – eliminar recurso
app.delete('/usuarios/:id', (req, res) => {
  // ..
});

```

---

## Parámetros de ruta (`:id`) - Parte 1

Capturar valores dinámicos de la URL.

```javascript
// Ruta con un parámetro
app.get('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  res.json({ usuario: `Usuario ${id}` });
});

// URL: /usuarios/42 → req.params.id = '42'
```

---

## Parámetros de ruta (`:id`) - Parte 2

Múltiples parámetros y ejemplos:

```javascript
// Múltiples parámetros
app.get('/usuarios/:id/posts/:postId', (req, res) => {
  const { id, postId } = req.params;
  res.json({ usuario: id, post: postId });
});

// URL: /usuarios/42/posts/7 → id='42', postId='7'
```

---

## Parámetros de ruta (`:id`) - Parte 2

Validación de parámetros en rutas.

```javascript
// Parámetros con validación (solo números)
app.get('/articulos/:id(\\d+)', (req, res) => {
  res.json({ articulo: req.params.id });
});

// URL: /articulos/123 ✅
// URL: /articulos/abc ❌

```

---

## Parámetros de ruta (`:id`) - Parte 3

Parámetro opcional:

```javascript
// Parámetro opcional
app.get('/search/:query?', (req, res) => {
  const query = req.params.query || 'sin búsqueda';
  res.json({ resultado: query });
});
```

---

## Query parameters

Parámetros en la cadena de consulta (`?clave=valor`).

```javascript
app.get('/buscar', (req, res) => {
  const { q, limite, pagina } = req.query;
  res.json({
    busqueda: q,
    limite: limite || 10,
    pagina: pagina || 1
  });
});

// URL: /buscar?q=javascript&limite=20&pagina=2
// req.query = { q: 'javascript', limite: '20', pagina: '2' }
```
--- 

**Diferencia entre parámetros:**
- **Ruta:** `/usuarios/42` → identifica recurso
- **Query:** `/usuarios?role=admin` → filtros

---

## Combinando parámetros de ruta y query

Ejemplo real: obtener usuarios con filtros.

```javascript
app.get('/usuarios/:id/amigos', (req, res) => {
  const usuarioId = req.params.id;   // Del path
  const limite = req.query.limite;   // Del query
  const ordenar = req.query.ordenar; // Del query
  
  res.json({
    usuarioId,
    amigos: [`Amigo 1`, `Amigo 2`],
    limite,
    ordenar
  });
});

// URL: /usuarios/42/amigos?limite=5&ordenar=asc
```

---

## Prioridad y orden de rutas (Parte 1)

Express evalúa rutas en el orden que se definen.

```javascript
// ❌ PROBLEMA: orden incorrecto

app.get('/usuarios/:id', (req, res) => {
  res.json({ id: req.params.id });
});

app.get('/usuarios/activos', (req, res) => {
  res.json({ tipo: 'activos' });
});

// URL: /usuarios/activos → 😱 coincide con :id!
El parámetro `:id` coincide primero porque ambas rutas comienzan con `/usuarios/`
```
---

## Prioridad y orden de rutas (Parte 2)

Cómo arreglar el problema de orden.

```javascript
// ✅ CORRECTO: específicas primero

app.get('/usuarios/activos', (req, res) => {
  res.json({ tipo: 'activos' });
});

app.get('/usuarios/inactivos', (req, res) => {
  res.json({ tipo: 'inactivos' });
});

// Rutas dinámicas al final
app.get('/usuarios/:id', (req, res) => {
  res.json({ id: req.params.id });
});

// Ahora /usuarios/activos se captura correctamente
```

---

## Agrupación de rutas relacionadas (Parte 1)

Usar `express.Router()` para organizar rutas por módulo.

```javascript
// routes/usuarios.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, nombre: 'Juan' }]);
});

router.post('/', (req, res) => {
  res.status(201).json(req.body);
});

router.get('/:id', (req, res) => {
  res.json({ id: req.params.id });
});

module.exports = router;
```

---

## Agrupación de rutas relacionadas (Parte 2)

Integrar el router en la aplicación principal.

```javascript
// app.js
const express = require('express');
const usuariosRoutes = require('./routes/usuarios'); // importamos las rutas que hemos exportado

const app = express();

// Usar router con prefijo
app.use('/usuarios', usuariosRoutes);

// URLs resultantes:
// GET /usuarios
// POST /usuarios
// GET /usuarios/42
```

**Ventajas:** Mejor organización, reutilización, mantenimiento

---

## Rutas dinámicas y comodines (Parte 1)

Patrones avanzados para rutas.

```javascript
// Ruta con expresión regular
app.get(/^\/usuario\d+$/, (req, res) => {
  res.json({ mensaje: 'Solo números' });
});

// URL: /usuario123 ✅ /usuario ❌

// Ruta con comodín (cualquier cosa)
app.get('/archivos/*', (req, res) => {
  const archivo = req.params[0];
  res.json({ archivo });
});

// URL: /archivos/docs/file.pdf → archivo='docs/file.pdf'
```

---

## Rutas dinámicas y comodines (Parte 2)

Multiples handlers en una ruta.

```javascript
// Múltiples handlers (middleware chain)
app.get(
  '/admin',
  verificarAutenticacion,
  verificarAdmin,
  (req, res) => {
    res.json({ panel: 'admin' });
  }
);

// Los handlers se ejecutan en orden
// hasta que uno no llame next()
```

---

# Middlewares

Componentes clave para procesar solicitudes

---

## Concepto de middleware

Un **middleware** es una función que intercepta solicitudes y respuestas, pudiendo:
- Procesar datos
- Validar permisos
- Registrar información (logging)
- Modificar `req` o `res`
- Terminar solicitud o pasar al siguiente middleware
---
**Estructura:**
```javascript
app.use((req, res, next) => {
  // Lógica del middleware
  next(); // Pasar al siguiente middleware/ruta
});
```

**Flujo:**
```
Solicitud → Middleware 1 → Middleware 2 → Ruta Handler → Respuesta
                  ↓              ↓              ↓
               next()         next()      res.json()
```

---

## Orden de ejecución

El orden en que se definen los middlewares es crucial.

```javascript
const express = require('express');
const app = express();

// Middleware 1 - se ejecuta primero
app.use((req, res, next) => {
  console.log('1️⃣  Middleware 1');
  req.timestamp = new Date();
  next();
});

// Middleware 2 - se ejecuta segundo
app.use((req, res, next) => {
  console.log('2️⃣  Middleware 2');
  next();
});

// Ruta
app.get('/', (req, res) => {
  console.log('3️⃣  Handler');
  res.json({ timestamp: req.timestamp });
});

// Salida al acceder a /:
// 1️⃣  Middleware 1
// 2️⃣  Middleware 2
// 3️⃣  Handler



```
---

**Importante:** Si un middleware no llama `next()`, la cadena se detiene.

---

## Middlewares built-in de Express

Express proporciona middlewares listos para usar.

```javascript
const express = require('express');
const app = express();

// Parsear JSON en el body
app.use(express.json());

// Parsear URL-encoded (formularios HTML)
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (CSS, imágenes, JS)
app.use(express.static('public'));

// Métodos HTTP (permite POST, PUT en formularios)
app.use(express.Router());
```

---

**Ejemplo práctico:**

```javascript
app.use(express.json());

app.post('/datos', (req, res) => {
  // req.body contiene el JSON parseado
  console.log(req.body);
  res.json({ recibido: req.body });
});

// Solicitud POST con Content-Type: application/json
// Body: { "nombre": "Juan" }
// req.body = { nombre: 'Juan' } ✅
```

---

## express.json() y express.urlencoded()

Middlewares para parsear diferentes tipos de datos.

```javascript
const express = require('express');
const app = express();

// Parsear JSON (API REST)
app.use(express.json());

// Parsear formularios HTML
app.use(express.urlencoded({ extended: true }));

// POST con JSON
app.post('/api/usuarios', (req, res) => {
  console.log(req.body); // { nombre: 'Juan', edad: 30 }
  res.json(req.body);
});

// POST con formulario HTML
app.post('/formulario', (req, res) => {
  console.log(req.body); // { nombre: 'Juan', edad: '30' }
  res.send('Formulario recibido');
});



```

---

**Diferencias:**
- `express.json()` – `Content-Type: application/json`
- `express.urlencoded()` – `Content-Type: application/x-www-form-urlencoded`

---



# Métodos HTTP en Detalle

Implementación práctica de solicitudes y respuestas

---

## Métodos HTTP estándar

REST define operaciones mediante métodos HTTP.

| Método | Propósito | Idempotente | Seguro |
|--------|-----------|-------------|--------|
| **GET** | Obtener datos | ✅ | ✅ |
| **POST** | Crear recurso | ❌ | ❌ |
| **PUT** | Actualizar completo | ✅ | ❌ |
| **DELETE** | Eliminar | ✅ | ❌ |
| **PATCH** | Actualizar parcial | ❌ | ❌ |
| **HEAD** | Como GET sin body | ✅ | ✅ |
| **OPTIONS** | Describir opciones | ✅ | ✅ |

---

**Implementación:**

```javascript
// API REST típica
app.get('/productos', listarProductos);          // Obtener todos
app.post('/productos', crearProducto);           // Crear
app.get('/productos/:id', obtenerProducto);      // Obtener uno
app.put('/productos/:id', actualizarProducto);   // Actualizar todo
app.patch('/productos/:id', actualizarParcial);  // Actualizar parcialmente
app.delete('/productos/:id', eliminarProducto);  // Eliminar
```

---

## Diferencia entre GET y POST

Similitudes y diferencias clave.

| Aspecto | GET | POST |
|---------|-----|------|
| **Datos** | Query params/URL | Body (JSON, form) |
| **Visible** | En URL | No visible |
| **Seguridad** | Baja (datos públicos) | Mayor (datos sensibles) |
| **Caché** | Automático | No automático |
| **Límite tamaño** | ~2KB URL | Sin límite |
| **Uso** | Obtener datos | Enviar/crear datos |

---

**Ejemplo:**

```javascript
// GET - parámetros en URL
// GET /buscar?q=javascript&limite=10
app.get('/buscar', (req, res) => {
  const { q, limite } = req.query;
  res.json({ busqueda: q, resultados: limite });
});

// POST - parámetros en body
// POST /usuarios con body { "nombre": "Juan", "email": "juan@example.com" }
app.post('/usuarios', (req, res) => {
  const { nombre, email } = req.body;
  res.status(201).json({ id: 1, nombre, email });
});
```

---

## Envío y recepción de JSON (Parte 1)

Formato estándar para APIs REST.

```javascript
const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Recibir JSON
app.post('/datos', (req, res) => {
  const datos = req.body;
  
  console.log('Datos recibidos:', datos);
  
  res.json({
    mensaje: 'Recibido',
    ecos: datos
  });
});
```

---

## Envío y recepción de JSON (Parte 2)

Ejemplo cliente-servidor.

```javascript
// Servidor - enviar JSON
app.get('/usuario/1', (req, res) => {
  res.json({
    id: 1,
    nombre: 'Juan García',
    email: 'juan@example.com'
  });
});

// Cliente (JavaScript) - POST
fetch('/datos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nombre: 'Juan' })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## Códigos de estado HTTP

Estados HTTP estándar para respuestas.

| Rango | Categoría | Ejemplos |
|-------|-----------|----------|
| **1xx** | Información | 100 Continue |
| **2xx** | Éxito | 200 OK, 201 Created, 204 No Content |
| **3xx** | Redirección | 301 Moved, 302 Found, 304 Not Modified |
| **4xx** | Error cliente | 400 Bad Request, 401 Unauthorized, 404 Not Found |
| **5xx** | Error servidor | 500 Server Error, 503 Service Unavailable |

---

## Códigos HTTP en Express (Parte 1)

Ejemplos de códigos 2xx y 4xx.

```javascript
// 200 OK (por defecto)
app.get('/ok', (req, res) => {
  res.json({ mensaje: 'Éxito' });
});

// 201 Created
app.post('/crear', (req, res) => {
  res.status(201).json({ id: 1 });
});

// 204 No Content
app.delete('/items/:id', (req, res) => {
  res.status(204).send();
});

// 400 Bad Request
app.post('/validar', (req, res) => {
  if (!req.body.nombre) {
    return res.status(400).json({ error: 'Nombre requerido' });
  }
  res.json({ ok: true });
});
```

---

## Códigos HTTP en Express (Parte 2)

Ejemplos de códigos 401 y 5xx.

```javascript
// 401 Unauthorized
app.get('/admin', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  res.json({ panel: 'admin' });
});

// 404 Not Found
app.get('/no-existe', (req, res) => {
  res.status(404).json({ error: 'Recurso no encontrado' });
});

// 500 Server Error
app.get('/error', (req, res) => {
  res.status(500).json({ error: 'Error interno' });
});
```

---

## Headers personalizados (Parte 1)

Cómo enviar y recibir headers HTTP.

```javascript
// Enviar headers
app.get('/headers', (req, res) => {
  res.set('X-Custom-Header', 'Valor');
  res.set('X-API-Version', '1.0');
  res.json({ mensaje: 'Headers enviados' });
});

// Recibir headers
app.post('/verificar', (req, res) => {
  const apiKey = req.get('X-API-Key');
  const contentType = req.get('Content-Type');
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API Key requerida' });
  }
  
  res.json({ apiKey: '***', contentType });
});
```

---

## Headers personalizados (Parte 2)

HEADERS CORS para permitir acceso cross-origin.

```javascript
// CORS headers
app.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.json({ acceso: 'permitido' });
});

// O usar middleware cors (recomendado)
const cors = require('cors');
app.use(cors());
```

---

# Recursos Adicionales

- [Documentación oficial de Express](https://expressjs.com/)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Códigos de estado HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [REST API Best Practices](https://restfulapi.net/)
