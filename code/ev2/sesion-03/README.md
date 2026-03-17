# Sesión 03 — Fundamentos de Express

Ejemplos autocontenidos extraídos de las slides de la sesión 03.

## Estructura

```
sesion-03/
├── 01-servidor-basico.js   → Servidor mínimo, puertos, res.json / res.send
├── 02-rutas.js             → Parámetros de ruta, query string, orden de rutas
├── 03-router.js            → Express.Router() y agrupación de rutas
│   └── routes/
│       └── usuarios.js     → Router de usuarios
├── 04-middlewares.js       → Middlewares globales y de ruta, ciclo de vida
└── 05-metodos-http.js      → GET, POST, PUT, PATCH, DELETE completo
```

## Cómo usar

```bash
npm install

# Ejecutar cada ejemplo por separado (cada uno escucha en puerto 3000)
npm run dev:01
npm run dev:02
npm run dev:03
npm run dev:04
npm run dev:05
```

Prueba las rutas con curl o con cualquier cliente HTTP (Thunder Client, Postman, etc.).
