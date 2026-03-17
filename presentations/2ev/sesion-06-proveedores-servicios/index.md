---
marp: true
theme: psp
footer: '2DAM - PSP'
paginate: true
---

# Sesión 6: Proveedores y Servicios

Inyección de Dependencias en NestJS

---

## Objetivos de Aprendizaje

- Crear **servicios** con `@Injectable` para encapsular lógica de negocio
- Entender cómo NestJS **inyecta dependencias** automáticamente
- Comprender el patrón **Singleton** en los proveedores
- Aplicar la **separación de responsabilidades** entre controlador y servicio

---

# El Decorador `@Injectable`

Creación de servicios para la lógica de negocio

---

## ¿Qué es un servicio en NestJS?

Un servicio es una clase marcada con `@Injectable` que encapsula la **lógica de negocio** de un dominio.

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, nombre: 'Ana', email: 'ana@example.com' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(u => u.id === id);
  }
}
```

`@Injectable()` → NestJS gestiona el ciclo de vida de esta clase.

---

## Responsabilidades de un servicio

Un servicio **no sabe nada** de HTTP. Solo opera con datos.

| Responsabilidad | ¿Del controlador? | ¿Del servicio? |
|-----------------|--------------------|----------------|
| Recibir petición HTTP | ✅ | ❌ |
| Validar parámetros de ruta | ✅ | ❌ |
| Lógica de negocio | ❌ | ✅ |
| Acceso a base de datos | ❌ | ✅ |
| Calcular resultados | ❌ | ✅ |
| Enviar respuesta HTTP | ✅ | ❌ |

---

## Convenciones de nombres

NestJS usa un esquema de nombres consistente para todos los archivos.

```
users/
├── users.module.ts       → @Module
├── users.controller.ts   → @Controller  (capa HTTP)
└── users.service.ts      → @Injectable  (lógica de negocio)
```

**Patrón:** `<dominio>.<tipo>.ts` → clase `<Dominio><Tipo>`

```typescript
// users.service.ts
@Injectable()
export class UsersService { ... }

// products.service.ts
@Injectable()
export class ProductsService { ... }
```

---

## Métodos en servicios

Los servicios exponen métodos que representan operaciones del dominio.

```typescript
@Injectable()
export class UsersService {
  private users: User[] = [];

  // Consultas
  findAll(): User[]              { return this.users; }
  findOne(id: number): User      { return this.users.find(u => u.id === id); }

  // Mutaciones
  create(data: CreateUserDto): User {
    const user = { id: Date.now(), ...data };
    this.users.push(user);
    return user;
  }

  update(id: number, data: Partial<User>): User {
    const user = this.findOne(id);
    Object.assign(user, data);
    return user;
  }

  remove(id: number): void {
    this.users = this.users.filter(u => u.id !== id);
  }
}
```

---

# Inyección de Dependencias (DI)

Cómo NestJS instancia y provee los servicios automáticamente

---

## ¿Qué es la inyección de dependencias?

La **DI** es un patrón en el que una clase declara sus dependencias y el framework se encarga de crearlas e inyectarlas.

**Sin DI (acoplado):**
```typescript
export class UsersController {
  // ❌ el controlador crea el servicio manualmente
  private usersService = new UsersService();
}
```

**Con DI (desacoplado):**
```typescript
export class UsersController {
  // ✅ NestJS crea e inyecta UsersService
  constructor(private readonly usersService: UsersService) {}
}
```

**Ventaja:** el controlador no depende de *cómo* se construye el servicio.

---

## Constructor injection

La forma más habitual de inyectar dependencias en NestJS.

```typescript
@Controller('users')
export class UsersController {
  // NestJS resuelve UsersService del módulo y lo inyecta aquí
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
```

`private readonly` → solo legible dentro de la clase, no reasignable.

---

## Proveedores en NestJS

Un proveedor es cualquier clase registrada en `providers` de un módulo.

```typescript
@Module({
  controllers: [UsersController],
  providers: [UsersService],  // ← registrar el proveedor
})
export class UsersModule {}
```

Formas equivalentes de registrar un proveedor:

```typescript
providers: [
  UsersService,                          // forma corta (la habitual)

  { provide: UsersService, useClass: UsersService },  // forma larga explícita

  { provide: 'CONFIG', useValue: { port: 3000 } },    // valor literal

  { provide: 'DB', useFactory: () => createConnection() }, // factory
]
```

---

## Inyectar un servicio en otro servicio

Los servicios también pueden depender de otros servicios.

```typescript
@Injectable()
export class OrdersService {
  // OrdersService depende de UsersService
  constructor(private readonly usersService: UsersService) {}

  createOrder(userId: number, items: string[]) {
    const user = this.usersService.findOne(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return { user, items, total: items.length * 10 };
  }
}
```

```typescript
@Module({
  imports: [UsersModule],      // importar el módulo que exporta UsersService
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
```

---

## Bootstrapping automático

NestJS construye el **grafo de dependencias** al arrancar y resuelve el orden de instanciación.

```
NestFactory.create(AppModule)
    │
    ├─ AppModule
    │   ├─ UsersModule
    │   │   ├─ instancia UsersService       (sin dependencias)
    │   │   └─ instancia UsersController    (necesita UsersService ✅)
    │   └─ OrdersModule
    │       ├─ UsersModule (ya instanciado, se reutiliza)
    │       ├─ instancia OrdersService      (necesita UsersService ✅)
    │       └─ instancia OrdersController   (necesita OrdersService ✅)
    │
    └─ Servidor HTTP listo 🚀
```

---

# Singletons

Los servicios son instancias únicas por defecto

---

## Patrón Singleton en NestJS

Por defecto, NestJS crea **una única instancia** de cada proveedor por módulo y la reutiliza en todas las inyecciones.

```typescript
@Injectable()
export class CounterService {
  private count = 0;

  increment() { this.count++; }
  getCount()  { return this.count; }
}
```

```typescript
// ControllerA y ControllerB comparten LA MISMA instancia de CounterService
@Controller('a')
export class ControllerA {
  constructor(private counter: CounterService) {}

  @Post('inc') increment() { this.counter.increment(); }
}

@Controller('b')
export class ControllerB {
  constructor(private counter: CounterService) {}

  @Get('count') getCount() { return this.counter.getCount(); }
}
// POST /a/inc → count = 1
// GET  /b/count → 1  (misma instancia)
```

---

## Implicaciones del patrón Singleton

**Ventajas:**
- Eficiencia: se crea una sola instancia, sin coste de instanciación repetida
- Estado compartido entre todos los consumidores del servicio
- Consistencia de datos en memoria

**Precaución:**

```typescript
@Injectable()
export class SessionService {
  // ⚠️ estado mutable en un singleton → compartido entre TODAS las peticiones
  private currentUser: User | null = null;

  setUser(user: User)  { this.currentUser = user; }    // ❌ peligroso
  getUser(): User | null { return this.currentUser; }
}
```

> Los servicios Singleton **no deben guardar estado por petición**.  
> Usa el objeto `Request` o `AsyncLocalStorage` para estado por petición.

---

## Scopes de los proveedores

Aunque el Singleton es el default, NestJS permite otros scopes.

| Scope | Descripción | Cuándo usarlo |
|-------|-------------|---------------|
| `DEFAULT` (Singleton) | Una instancia por módulo | La mayoría de casos |
| `REQUEST` | Nueva instancia por petición HTTP | Estado por petición (ej: usuario actual) |
| `TRANSIENT` | Nueva instancia cada vez que se inyecta | Casos muy específicos |

```typescript
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestScopedService {
  // Nueva instancia para cada petición HTTP
}
```

---

# Separación de Responsabilidades

Por qué el controlador no debe contener lógica de negocio

---

## El patrón MVC en NestJS

NestJS sigue el patrón **Model-View-Controller** adaptado a APIs REST.

```
Petición HTTP
     │
     ▼
┌─────────────────────┐
│   Controller        │  ← capa de transporte (HTTP)
│   @Controller       │    recibe, valida params, llama al servicio
└──────────┬──────────┘
           │ llama
           ▼
┌─────────────────────┐
│   Service           │  ← capa de negocio
│   @Injectable       │    lógica, cálculos, reglas
└──────────┬──────────┘
           │ accede
           ▼
┌─────────────────────┐
│   Repository / DB   │  ← capa de datos
└─────────────────────┘
```

---

## ❌ Mal: lógica de negocio en el controlador

```typescript
@Controller('orders')
export class OrdersController {
  @Post()
  create(@Body() body) {
    // ❌ lógica de negocio mezclada con HTTP
    if (body.items.length === 0) {
      throw new BadRequestException('El pedido no tiene productos');
    }
    const total = body.items.reduce((sum, item) => sum + item.precio, 0);
    const descuento = total > 100 ? total * 0.1 : 0;
    const finalPrice = total - descuento;

    // ❌ acceso directo a BD desde el controlador
    const order = { ...body, total: finalPrice, fecha: new Date() };
    this.db.save(order);
    return order;
  }
}
```

---

## ✅ Bien: responsabilidades separadas

```typescript
// orders.controller.ts — solo HTTP
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateOrderDto) {
    return this.ordersService.create(body);  // delega al servicio
  }
}

// orders.service.ts — lógica de negocio
@Injectable()
export class OrdersService {
  create(data: CreateOrderDto) {
    if (data.items.length === 0) throw new BadRequestException('Sin productos');
    const total = data.items.reduce((sum, i) => sum + i.precio, 0);
    const descuento = total > 100 ? total * 0.1 : 0;
    return this.ordersRepository.save({ ...data, total: total - descuento });
  }
}
```

---

## Testabilidad con separación de responsabilidades

La separación facilita las pruebas unitarias al poder reemplazar el servicio por un mock.

```typescript
// orders.controller.spec.ts
describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(() => {
    // Inyectar mock del servicio — no necesita BD real
    const mockService = { create: jest.fn().mockReturnValue({ id: 1 }) };

    controller = new OrdersController(mockService as any);
  });

  it('debe llamar al servicio y devolver el pedido', () => {
    const result = controller.create({ items: [{ precio: 20 }] } as any);
    expect(result).toEqual({ id: 1 });
  });
});
```

> Si el controlador tuviese lógica de negocio, el test necesitaría BD, servicios externos, etc.

---

# Recursos Adicionales

- [Documentación de Providers en NestJS](https://docs.nestjs.com/providers)
- [Inyección de Dependencias en NestJS](https://docs.nestjs.com/fundamentals/dependency-injection)
- [Ciclo de vida de los proveedores](https://docs.nestjs.com/fundamentals/lifecycle-events)
