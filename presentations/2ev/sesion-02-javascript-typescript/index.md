---
marp: true
---

# Sesión 2: JavaScript Moderno y TypeScript

---

## Objetivos de Aprendizaje

- Dominar la **asincronía avanzada** con Promises y async/await
- Entender los fundamentos de **TypeScript** y tipado estático
- Trabajar con **clases y decoradores** en TypeScript
- Configurar y compilar proyectos con **tsconfig.json**

---

# Asincronía Avanzada

Domina Promises, async/await y evita el "callback hell"

---

## Callbacks y sus limitaciones

Un callback es una función que se pasa como argumento y se ejecuta después de una operación asincrónica.

TODO: ampliar info

**El problema: Callback Hell (Pyramid of Doom)**

```javascript
// ❌ Difícil de leer y mantener
obtenerDatos((datos1) => {
  procesarDatos(datos1, (datos2) => {
    guardarDatos(datos2, (datos3) => {
      console.log('¡Listo!', datos3);
    });
  });
});
```
---

**Limitaciones:**
- Código difícil de leer y depurar
- Manejo de errores complicado
- Difícil composición de operaciones

---

## Introducción a Promises

Una **Promise** es un objeto que representa el resultado eventual de una operación asincrónica.

**Estados de una Promise:**
- `pending` (pendiente)
- `fulfilled` (resuelta con valor)
- `rejected` (rechazada con error)

---
```javascript
const miPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('¡Éxito!');
  }, 1000);
});

console.log(miPromise); // Promise { <pending> }
```

---

## Encadenamiento con `.then()`, `.catch()`, `.finally()`

Las Promises permiten encadenar operaciones de forma más legible.

```javascript
fetch('https://api.example.com/datos')
  .then(response => response.json())
  .then(datos => console.log('Datos:', datos))
  .catch(error => console.error('Error:', error))
  .finally(() => console.log('Operación completada'));
```

**Métodos principales:**
- `.then()` – maneja éxito
- `.catch()` – maneja error
- `.finally()` – se ejecuta siempre

---

## El patrón `async/await`

**async/await** es syntactic sugar sobre Promises, haciendo el código más legible.

```javascript
async function obtenerDatos() {
  try {
    const response = await fetch('https://api.example.com/datos');
    const datos = await response.json();
    console.log('Datos:', datos);
    return datos;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    console.log('Operación completada');
  }
}

obtenerDatos();
---
```

**Ventajas:**
- Código casi sincrónico, fácil de leer
- Uso de try/catch tradicional
- Control de flujo claro

---

## Manejo de errores en código asincrónico

Diferentes estrategias para capturar y manejar errores.

```javascript
// Con async/await y try/catch
async function operacion() {
  try {
    const resultado = await operacionRiesgosa();
    return resultado;
  } catch (error) {
    console.error('Error capturado:', error.message);
    throw new Error('Operación fallida');
  }
}

// Con .catch()
fetch('/datos')
  .then(res => res.json())
  .catch(err => console.error('Error en fetch:', err));
```

---

## Promise.all(), Promise.race(), Promise.allSettled()

TODO: ampliar info

Métodos para trabajar con múltiples Promises.

```javascript
const promise1 = fetch('/datos1');
const promise2 = fetch('/datos2');
const promise3 = fetch('/datos3');

// Espera a que TODAS se resuelvan (falla si una falla)
Promise.all([promise1, promise2, promise3])
  .then(([res1, res2, res3]) => console.log('Todos listos'));

// Devuelve el PRIMERO en resolverse
Promise.race([promise1, promise2, promise3])
  .then(resultado => console.log('Primero:', resultado));

// Espera todas, devuelve estado (fulfilled o rejected)
Promise.allSettled([promise1, promise2, promise3])
  .then(resultados => console.log('Todos completados:', resultados));
```

---

# Fundamentos de TypeScript

Tipado estático, interfaces y tipos personalizados para código robusto

---

## ¿Por qué TypeScript?

JavaScript es dinámico, lo que permite flexibilidad pero también errores en runtime.

**Ventajas de TypeScript:**
- ✅ Detección de errores en tiempo de compilación
- ✅ Autocompletado mejorado en el IDE
- ✅ Documentación implícita a través de tipos
- ✅ Refactoring seguro
- ✅ Mejor mantenibilidad en proyectos grandes

---

**Desventajas:**
- ⚠️ Requiere proceso de compilación (transpilación a JavaScript)
- ⚠️ Curva de aprendizaje adicional

```bash
# Instalar TypeScript
npm install --save-dev typescript

# Compilar
npx tsc archivo.ts
```

---

## Sistema de tipos básicos

TypeScript proporciona tipos primitivos y complejos.

---

```typescript
// Primitivos
const nombre: string = 'Juan';
const edad: number = 25;
const activo: boolean = true;
const indefinido: undefined = undefined;
const nulo: null = null;

// Arrays
const numeros: number[] = [1, 2, 3];
const nombres: Array<string> = ['Juan', 'María'];

// Any (evitar si es posible)
let valor: any = 'puede ser cualquier cosa';

// Union types
let resultado: string | number;
resultado = 'éxito'; // ✅
resultado = 200;    // ✅
```

---

## Tipos personalizados con `type`

Define tipos reutilizables para estructuras de datos complejas.

```typescript
// Type alias
type Usuario = {
  id: number;
  nombre: string;
  email: string;
  activo?: boolean; // opcional
};

const usuario: Usuario = {
  id: 1,
  nombre: 'Juan',
  email: 'juan@example.com'
};

// Union type
type Respuesta = 'éxito' | 'error' | 'pendiente';
const estado: Respuesta = 'éxito'; // ✅
// estado = 'otro'; // ❌ Error
```

---

## Interfaces vs tipos

Ambas definen contratos, pero tienen diferencias.

TODO: ampliar info

**Interfaces:**
```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

// Las interfaces se pueden extender
interface UsuarioPremium extends Usuario {
  suscripcion: 'mensual' | 'anual';
}
```

---

**Types:**
```typescript
type Usuario = {
  id: number;
  nombre: string;
  email: string;
};

// Los types se pueden componer con &
type UsuarioPremium = Usuario & {
  suscripcion: 'mensual' | 'anual';
};
```

**Diferencia clave:**
- Interfaces pueden ser redeclaradas (merging)
- Types son más flexibles (unions, intersecciones)

---

## Genéricos

Permiten reutilizar código con diferentes tipos.

```typescript
// Función genérica
function obtenerPrimero<T>(array: T[]): T {
  return array[0];
}

const numeros = obtenerPrimero<number>([1, 2, 3]); // number
const nombres = obtenerPrimero<string>(['a', 'b']); // string

```

---

```typescript
// Type genérico
type Contenedor<T> = {
  valor: T;
  procesar: (v: T) => T;
};

const contenedorNumero: Contenedor<number> = {
  valor: 42,
  procesar: (v) => v * 2
};
```

---

## Uniones e intersecciones de tipos

Combina múltiples tipos para crear nuevos tipos más específicos.

```typescript
// Union (|) – ES UNO U OTRO
type Exito = { tipo: 'exito'; datos: any };
type Error = { tipo: 'error'; mensaje: string };
type Resultado = Exito | Error;

const resultado: Resultado = {
  tipo: 'exito',
  datos: { id: 1 }
};

// Intersección (&) – ES AMBOS
type Persona = { nombre: string; edad: number };
type Empleado = { empresa: string; salario: number };
type PersonaEmpleada = Persona & Empleado;

const empleado: PersonaEmpleada = {
  nombre: 'Juan',
  edad: 30,
  empresa: 'Acme',
  salario: 50000
};
```

---

# Clases y Decoradores

Orientación a objetos en TypeScript y modificadores de comportamiento

---

## Sintaxis de clases en TypeScript

Clases modernas con propiedades y métodos tipados.

```typescript
class Persona {
  nombre: string;
  edad: number;

  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }

  presentarse(): string {
    return `Hola, soy ${this.nombre} y tengo ${this.edad} años`;
  }
}

const persona = new Persona('Juan', 30);
console.log(persona.presentarse());
```

---

## Modificadores de acceso

Controla qué es accesible desde fuera de la clase.

```typescript
class Cuenta {
  public saldo: number; // Accesible desde cualquier lugar
  private pin: number;  // Solo desde la clase
  protected historial: any[]; // Clase y subclases

  constructor(saldo: number, pin: number) {
    this.saldo = saldo;
    this.pin = pin;
    this.historial = [];
  }

  public retirar(cantidad: number, pin: number): boolean {
    if (this.verificarPin(pin)) {
      this.saldo -= cantidad;
      this.historial.push({ tipo: 'retiro', cantidad });
      return true;
    }
    return false;
  }
}

const cuenta = new Cuenta(1000, 1234);
console.log(cuenta.saldo); // ✅
// cuenta.pin; // ❌ Error: es private
```

---

## Constructores y propiedades

Forma abreviada de declarar propiedades en constructores.

```typescript
// Forma larga
class Usuario {
  id: number;
  nombre: string;
  email: string;

  constructor(id: number, nombre: string, email: string) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
  }
}

// Forma abreviada (TypeScript)
class Usuario {
  constructor(
    public id: number,
    public nombre: string,
    public email: string
  ) {}
}

// Ambas son equivalentes
```

---

## Métodos y getters/setters

Acceso controlado a propiedades con lógica personalizada.

TODO: ampliar info

```typescript
class Producto {
  private _precio: number;

  constructor(precio: number) {
    this._precio = precio;
  }

  // Getter – acceso como propiedad
  get precio(): number {
    return this._precio;
  }

  // Setter – asignación como propiedad
  set precio(valor: number) {
    if (valor < 0) {
      throw new Error('El precio no puede ser negativo');
    }
    this._precio = valor;
  }

  calcularIVA(): number {
    return this._precio * 0.21;
  }
}

const producto = new Producto(100);
console.log(producto.precio); // 100 (getter)
producto.precio = 120; // setter
// producto.precio = -50; // ❌ Error
```

---

## Conceptos de decoradores

Los **decoradores** son funciones que modifican clases, métodos o propiedades en tiempo de compilación.

**Nota:** Los decoradores es una característica experimental.

```typescript
// Habilitar experimentalDecorators en tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```
---

Los decoradores son muy utilizados en frameworks como **NestJS** para:
- Rutas HTTP
- Inyección de dependencias
- Validación
- Autorización

---

## Decoradores de clase

Modifican el comportamiento de una clase completa.

```typescript
// Decorador de clase simple
function Sellado(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@Sellado
class Producto {
  nombre: string = 'Producto';
}

// No se puede añadir nuevas propiedades
// (producto).nuevaPropiedad = 'error'; // ❌

```

---

```typescript
// Decorador con lógica
function AgregarTimestamp(constructor: Function) {
  constructor.prototype.creado = new Date();
}

@AgregarTimestamp
class Usuario {
  nombre: string;
  creado?: Date;
}

const usuario = new Usuario();
console.log(usuario.creado); // Fecha actual
```

---

## Decoradores de método y propiedad

Modifican métodos específicos o propiedades de una clase.

```typescript
// Decorador de método
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const metodoOriginal = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(`Llamando a ${propertyKey} con args:`, args);
    const resultado = metodoOriginal.apply(this, args);
    console.log(`Resultado de ${propertyKey}:`, resultado);
    return resultado;
  };

  return descriptor;
}

class Calculadora {
  @Log
  sumar(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculadora();
calc.sumar(5, 3);
// Logs:
// Llamando a sumar con args: [5, 3]
// Resultado de sumar: 8
```

---

# Configuración de TypeScript

El archivo `tsconfig.json` y el proceso de compilación

---

## Estructura del `tsconfig.json`

Archivo de configuración que controla cómo TypeScript compila tu proyecto.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Opciones de compilación importantes

Principales opciones de `compilerOptions`:

- `target` – versión de JavaScript de salida (ES2020, ESNext, etc.)
- `module` – sistema de módulos (commonjs, esnext, etc.)
- `lib` – librerías de tipos incluidas (ES2020, DOM, etc.)
- `outDir` – carpeta donde se guardan los `.js` compilados
- `rootDir` – carpeta raíz de código TypeScript
- `strict` – habilita todas las comprobaciones de tipo estricto
- `declaration` – generar archivos `.d.ts` (type definitions)

---

## Targeting y módulos

Elige versión de JavaScript y sistema de módulos.

```json
{
  "compilerOptions": {
    "target": "ES2020",        // Versión de JavaScript
    "module": "commonjs",       // O "esnext", "umd", "amd"
    "lib": ["ES2020", "DOM"],   // APIs disponibles
    "skipLibCheck": true
  }
}
```

**Opciones de target:**
- `ES5` – máxima compatibilidad
- `ES2020` – JavaScript moderno
- `ESNext` – última versión de JavaScript

---

## Strict mode

Habilita comprobaciones de tipo más estrictas.

```json
{
  "compilerOptions": {
    "strict": true  // Habilita todas las opciones strict
    // O individualmente:
    // "noImplicitAny": true,
    // "strictNullChecks": true,
    // "strictFunctionTypes": true,
    // "strictBindCallApply": true,
    // "strictPropertyInitialization": true,
    // "noImplicitThis": true,
    // "alwaysStrict": true
  }
}
```

**Con strict mode:**
```typescript
// ❌ Error: Tipo inferido como 'any'
function procesar(datos) {}

// ✅ Correcto
function procesar(datos: any) {}
```

---

## Compilación a JavaScript

Proceso de transpilación de TypeScript a JavaScript.

```bash
# Compilar una sola vez
npx tsc

# Compilar en modo watch (observa cambios)
npx tsc --watch

# Compilar con configuración específica
npx tsc --project tsconfig.custom.json

# Generar archivos de definición de tipos
npx tsc --declaration
```

**Resultado:** Los archivos `.ts` se convierten en `.js` en `outDir`.

---

## Integración con herramientas de construcción

TypeScript se integra con bundlers y task runners.

**Webpack:**
```javascript
module: {
  rules: [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }
  ]
}
```

**Vite:**
```bash
npm create vite@latest mi-app -- --template vue-ts
```

**NestJS (ya integrado):**
```bash
npm i -g @nestjs/cli
nest new mi-proyecto
```

---

# Recursos Adicionales

- [Documentación oficial de TypeScript](https://www.typescriptlang.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Playground de TypeScript](https://www.typescriptlang.org/play)