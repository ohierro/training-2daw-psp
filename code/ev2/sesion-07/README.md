# Sesión 07 — Persistencia de Datos con TypeORM

Proyecto NestJS + TypeORM + SQLite autocontenido que demuestra los conceptos de la sesión 07.
No requiere servidor de base de datos: SQLite crea un archivo local `database.sqlite`.

## Estructura

```
src/
├── main.ts
├── app.module.ts              → TypeOrmModule.forRoot() con SQLite
├── users/
│   ├── users.module.ts        → TypeOrmModule.forFeature([User])
│   ├── user.entity.ts         → @Entity, @Column, @OneToMany
│   ├── users.controller.ts    → CRUD completo
│   └── users.service.ts       → Repository<User>, búsquedas, QueryBuilder
└── products/
    ├── products.module.ts
    ├── product.entity.ts      → tipos de columnas variados (@Column decimal, nullable...)
    ├── products.controller.ts
    └── products.service.ts
```

## Cómo usar

```bash
npm install
npm run start:dev
```

El servidor arranca en `http://localhost:3000`.
TypeORM crea el archivo `database.sqlite` automáticamente con `synchronize: true`.

## Rutas disponibles

```
# Users
GET    /users                  → todos los usuarios
GET    /users?role=admin        → filtrar por role
GET    /users/:id              → usuario por id (lanza 404 si no existe)
GET    /users/:id/con-productos → usuario con sus productos (relación)
POST   /users                  body: { "nombre": "...", "email": "...", "role": "admin" }
PATCH  /users/:id              body: { "nombre": "..." }
DELETE /users/:id

# Products
GET    /products               → todos los productos
GET    /products?activo=true   → solo activos
GET    /products/:id
POST   /products               body: { "nombre": "...", "precio": 29.99, "stock": 10 }
PATCH  /products/:id           body: { "precio": 19.99 }
DELETE /products/:id
```

## Ejemplos curl

```bash
# Crear usuarios
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana García","email":"ana@example.com","role":"admin"}'

# Listar con filtro
curl http://localhost:3000/users?role=admin

# Crear producto
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Teclado mecánico","precio":89.99,"stock":15}'

# Intentar email duplicado → 409 Conflict
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Otro","email":"ana@example.com"}'
```
