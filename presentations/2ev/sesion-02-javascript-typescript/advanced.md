---
marp: true
theme: psp
footer: '2DAM - PSP'
paginate: true
---

## Promise.all(), Promise.race(), Promise.allSettled()

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

## Tipos personalizados con `type`

Define tipos reutilizables para estructuras de datos complejas.

```typescript
// Type alias
type Usuario = {
  id: number;
  nombre: string;
  activo?: boolean; // opcional
};
const usuario: Usuario = {
  id: 1,
  nombre: 'Juan',
};

// Union type
type Respuesta = 'éxito' | 'error' | 'pendiente';
const estado: Respuesta = 'éxito'; // ✅
// estado = 'otro'; // ❌ Error
```

---

## Interfaces vs tipos

Ambas definen contratos, pero tienen diferencias.

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

## Métodos y getters/setters

Acceso controlado a propiedades con lógica personalizada.


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
```
---
```typescript
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