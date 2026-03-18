# Sesión 06 — Proveedores y Servicios (Inyección de Dependencias)

Proyecto NestJS autocontenido que demuestra los conceptos de la sesión 06.

## Estructura

```
src/
├── main.ts
├── app.module.ts
├── users/                    → servicio básico con @Injectable
│   ├── users.module.ts
│   ├── users.controller.ts
│   └── users.service.ts
├── orders/                   → servicio que inyecta otro servicio
│   ├── orders.module.ts      (importa UsersModule)
│   ├── orders.controller.ts
│   └── orders.service.ts     (depende de UsersService)
└── counter/                  → demuestra comportamiento Singleton
    ├── counter.module.ts
    ├── counter.service.ts     (estado compartido)
    ├── counter-a.controller.ts
    └── counter-b.controller.ts
```

## Conceptos demostrados

| Módulo | Concepto |
|--------|----------|
| `users/` | `@Injectable`, métodos CRUD, responsabilidades del servicio |
| `orders/` | Inyección de un servicio en otro, importar módulos |
| `counter/` | Patrón Singleton — dos controladores comparten la misma instancia |

## Cómo usar

```bash
npm install
npm run start:dev
```

Servidor en `http://localhost:3000`.

## Rutas disponibles

```
# Módulo Users
GET    /users
GET    /users/:id
POST   /users          body: { "nombre": "...", "email": "..." }
PATCH  /users/:id      body: { "email": "..." }
DELETE /users/:id

# Módulo Orders (depende de UsersService)
GET    /orders
POST   /orders         body: { "userId": 1, "items": ["Libro", "Lápiz"] }

# Módulo Counter (demuestra Singleton)
POST   /counter/a/inc  → incrementa contador
POST   /counter/a/inc  → incrementa de nuevo
GET    /counter/b      → lee el mismo contador (misma instancia)
```
