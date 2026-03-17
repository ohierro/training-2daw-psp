# Sesión 05 — NestJS: Controladores y Rutas

Proyecto NestJS autocontenido que ilustra los decoradores de clase y método,
acceso a datos de la petición y manejo de respuestas HTTP.

## Estructura

```
sesion-05/
└── src/
    ├── main.ts
    ├── app.module.ts
    └── users/
        ├── users.module.ts
        ├── users.controller.ts  → @Param, @Query, @Body, @Headers, @HttpCode, excepciones
        └── users.service.ts     → lógica CRUD en memoria
```

## Cómo usar

```bash
npm install
npm run start        # ejecutar una vez
npm run start:dev    # modo watch con nodemon
```

El servidor arranca en `http://localhost:3000`.

## Rutas disponibles

| Método | Ruta                    | Descripción                        |
|--------|-------------------------|------------------------------------|
| GET    | /users                  | Listar (con ?page y ?role opcionales) |
| GET    | /users/:id              | Obtener por id (lanza 404 si no existe) |
| POST   | /users                  | Crear usuario (devuelve 201)        |
| PUT    | /users/:id              | Reemplazar usuario completo        |
| PATCH  | /users/:id              | Actualización parcial              |
| DELETE | /users/:id              | Eliminar (devuelve 204)            |
| GET    | /users/:id/posts        | Subruta con múltiples params       |

## Ejemplos curl

```bash
# Listar
curl http://localhost:3000/users
curl http://localhost:3000/users?page=2&role=admin

# Obtener uno
curl http://localhost:3000/users/1
curl http://localhost:3000/users/999    # → 404

# Crear
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Carlos","email":"carlos@example.com"}'

# Actualización parcial
curl -X PATCH http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"email":"nuevo@example.com"}'

# Eliminar
curl -X DELETE http://localhost:3000/users/1
```
