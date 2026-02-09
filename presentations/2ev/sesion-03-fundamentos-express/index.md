# Sesión 3: Fundamentos de Express

## Objetivos de Aprendizaje

Aprender a crear servidores web con Express y entender los conceptos fundamentales de routing y middlewares.

## Contenidos

### Servidor HTTP básico

Creación de un servidor con `express()` y escucha en un puerto.

- Instalación de Express
- Creación de una aplicación Express
- Escucha en un puerto específico
- Respuestas básicas
- Ciclo de vida de una solicitud

### Sistema de Rutas (Routing)

Definición de rutas básicas y uso de parámetros en la URL (`/user/:id`).

- Rutas GET, POST, PUT, DELETE
- Parámetros de ruta (`:id`)
- Query parameters
- Prioridad de rutas
- Grouping de rutas relacionadas
- Rutas dinámicas

### Middlewares

Qué son, para qué sirven (logging, seguridad, parseo de JSON) y cómo crear un middleware propio.

- Concepto de middleware
- Orden de ejecución
- Middlewares built-in de Express
- `express.json()` y `express.urlencoded()`
- Creación de middlewares personalizados
- Middlewares de error
- Control de flujo con `next()`

### Métodos HTTP

Implementación de GET y POST enviando respuestas en formato JSON.

- Métodos HTTP estándar
- Diferencia entre GET y POST
- Envío y recepción de datos JSON
- Códigos de estado HTTP
- Headers personalizados
- Validación básica de datos

## Recursos Adicionales

- [Documentación oficial de Express](https://expressjs.com/)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
