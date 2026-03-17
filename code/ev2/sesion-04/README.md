# Sesión 04 — NestJS: Arquitectura

Proyecto NestJS mínimo autocontenido que ilustra los conceptos de la sesión 04.

## Estructura

```
sesion-04/
└── src/
    ├── main.ts                  → Bootstrap + NestFactory + configuración global
    ├── app.module.ts            → Módulo raíz
    ├── app.controller.ts        → Controlador raíz
    ├── app.service.ts           → Servicio raíz
    └── users/
        ├── users.module.ts      → Módulo de feature 'users'
        ├── users.controller.ts  → Controlador de usuarios
        └── users.service.ts     → Servicio con lógica + lifecycle hooks
```

## Cómo usar

```bash
npm install
npm run start        # ejecutar una vez
npm run start:dev    # modo watch con nodemon
```

El servidor arranca en `http://localhost:3000`.

## Rutas disponibles

| Método | Ruta         | Descripción              |
|--------|--------------|--------------------------|
| GET    | /            | Saludo del AppController |
| GET    | /users       | Lista de usuarios        |
| GET    | /users/:id   | Usuario por id           |
