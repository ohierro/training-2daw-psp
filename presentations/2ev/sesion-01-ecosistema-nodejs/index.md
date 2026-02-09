---
marp: true
---

# Sesión 1: El Ecosistema Node.js

---

## Objetivos de Aprendizaje

En esta sesión aprenderás los fundamentos del ecosistema Node.js y cómo funciona en entornos de servidor.

### Contenidos a cubrir:

- Motor V8 y Event Loop
- Gestión de paquetes con NPM
- Módulos en Node.js
- Globales y utilidades

---

# Introducción al motor V8 y el Event Loop

Cómo Node.js maneja la concurrencia sin hilos (single-threaded).

---

## ¿Qué es V8?

V8 es el motor de JavaScript desarrollado por Google que utilizan Node.js y Google Chrome. Es un compilador JIT (Just-In-Time) que:

- Compila el código JavaScript a código máquina para mejor rendimiento
- Ejecuta el código de forma muy eficiente
- Proporciona acceso a APIs del sistema operativo que Node.js necesita
- Maneja la gestión de memoria y recolección de basura automáticamente

**Característica clave:** V8 es **single-threaded**, lo que significa que solo ejecuta un hilo de código JavaScript a la vez.

---

## El Event Loop (bucle de eventos)

El Event Loop es el corazón de Node.js. Es un mecanismo que permite procesar múltiples operaciones de forma no bloqueante, dando la sensación de concurrencia aunque solo haya un hilo.

**Cómo funciona:**

1. **Recibe una operación** (lectura de archivo, petición HTTP, timer, etc.)
2. **La delega al sistema operativo** o a un thread pool
3. **Continúa procesando otras operaciones**
4. **Cuando termina**, la operación retorna al Event Loop como callback
5. **El callback se ejecuta** cuando el Event Loop vuelve a esa tarea

**Ejemplo práctico:**

```javascript
console.log('1. Inicio');

setTimeout(() => {
  console.log('2. Timer completado (Event Loop)');
}, 1000);

console.log('3. Fin del código síncrono');

// Salida:
// 1. Inicio
// 3. Fin del código síncrono
// 2. Timer completado (Event Loop)
```

El callback del `setTimeout` no se ejecuta inmediatamente; el Event Loop lo encola y lo ejecuta después.

---

## Concurrencia sin multithreading

Node.js logra **concurrencia sin hilos explícitos** mediante:

- **Operaciones no bloqueantes:** Las operaciones I/O no esperan a completarse
- **Callbacks y Promesas:** Se ejecutan cuando los datos están listos
- **Async/Await:** Sintaxis moderna para manejar operaciones asincrónicas

**Ejemplo con múltiples operaciones concurrentes:**

```javascript
const fs = require('fs');

// Lectura no bloqueante
fs.readFile('archivo1.txt', (err, data) => {
  console.log('Archivo 1 leído');
});

fs.readFile('archivo2.txt', (err, data) => {
  console.log('Archivo 2 leído');
});

console.log('Ambas lecturas iniciadas simultáneamente');

// Salida (el orden de los archivos puede variar):
// Ambas lecturas iniciadas simultáneamente
// Archivo 1 leído
// Archivo 2 leído
```

---

## Modelo de I/O no bloqueante

En lugar de esperar a que termine una operación I/O (lectura de archivo, red, base de datos), Node.js:

- Inicia la operación
- Proporciona un **callback** que se ejecuta cuando termina
- **Continúa procesando** otras tareas mientras espera

**Comparación:**

| Enfoque | Comportamiento | Ejemplo |
|---------|---|---------|
| **Bloqueante (tradicional)** | Espera a que termine cada operación | Lectura de archivo síncrona paraliza todo |
| **No bloqueante (Node.js)** | Inicia operaciones y continúa | Lectura de archivo asíncrona permite otras tareas |

Esto permite que un **único proceso Node.js maneje miles de conexiones simultáneamente** sin necesidad de crear un hilo por conexión, lo que lo hace muy eficiente en recursos.

---

# Gestión de paquetes con NPM

Uso de `npm init`, instalación de dependencias (`dependencies` vs `devDependencies`) y el archivo `package.json`.

- Inicializar un proyecto con `npm init`
- Estructura del `package.json`
- Tipos de dependencias: `dependencies` vs `devDependencies`
- Instalación y gestión de paquetes
- Versionamiento semántico

---

# Módulos en Node.js

Diferencia entre CommonJS (`require`) y ES Modules (`import/export`).

---

## Sistema de módulos CommonJS

CommonJS es el sistema de módulos nativo de Node.js. Utiliza `require()` para importar módulos y `module.exports` o `exports` para exportarlos.

**Características:**
- Carga **síncrona** de módulos
- Los módulos se cachean automáticamente después de la primera carga
- Cada módulo tiene su propio scope
- Compatible con todas las versiones de Node.js

---

**Ejemplo:**
```javascript
// math.js
function suma(a, b) {
  return a + b;
}

module.exports = { suma };

// app.js
const { suma } = require('./math.js');
console.log(suma(5, 3)); // 8
```

---

## Sistema de módulos ES6 (ES Modules)

ES Modules es el estándar moderno de JavaScript que Node.js también soporta (con `"type": "module"` en `package.json`).

**Características:**
- Carga **asíncrona** de módulos
- Mejor tree-shaking y optimización
- Importación selectiva más clara
- Soporte nativo en navegadores

**Ejemplo:**
```javascript
// math.js
export function suma(a, b) {
  return a + b;
}

// app.js
import { suma } from './math.js';
console.log(suma(5, 3)); // 8
```

---

## Comparativa: CommonJS vs ES Modules

| Aspecto | CommonJS | ES Modules |
|--------|----------|-----------|
| **Sintaxis** | `require()` / `module.exports` | `import` / `export` |
| **Carga** | Síncrona | Asíncrona |
| **Rendimiento** | Más lento en aplicaciones grandes | Más rápido, optimizable |
| **Compatibilidad** | Total (todas las versiones) | Requiere configuración en Node.js < 12 |
| **Tree-shaking** | No soporta | Soportado nativamente |
| **Caché de módulos** | Automática | Automática |
| **Curva de aprendizaje** | Más simple | Más moderna y estándar |
| **Interoperabilidad** | Limitada con ES Modules | Compatible con CommonJS (con limitaciones) |
| **Uso en entorno** | Backend (Node.js) | Frontend y Backend |

#### Cómo elegir entre ambos

- **Usa CommonJS** si trabajas con librerías legadas o necesitas máxima compatibilidad
- **Usa ES Modules** para proyectos nuevos y si quieres seguir el estándar moderno de JavaScript
- **Ventajas y desventajas de cada enfoque**

---

# Globales y Utilidades

Uso de `process` (variables de entorno), `__dirname`, y el módulo `fs` (File System) para lectura/escritura básica.

- El objeto global `process`
- Variables de entorno
- `__dirname` y `__filename`
- Módulo `fs` para operaciones de archivo
- Lectura y escritura básica de archivos

---

# Recursos Adicionales

- [Documentación oficial de Node.js](https://nodejs.org/docs/)
- [NPM Registry](https://www.npmjs.com/)
