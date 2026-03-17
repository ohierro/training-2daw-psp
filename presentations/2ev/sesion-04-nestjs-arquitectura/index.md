---
marp: true
theme: psp
footer: '2DAM - PSP'
paginate: true
---

# Sesión 4: Hola, NestJS: Arquitectura

---

## Objetivos de Aprendizaje

- Instalar y usar **Nest CLI** para crear proyectos
- Entender la **estructura de archivos** de un proyecto NestJS
- Comprender la **arquitectura modular** con `@Module`
- Seguir el flujo desde `main.ts` hasta el primer controlador

---

# Nest CLI

Instalación global y creación del proyecto con `nest new`

---

## Instalación de Nest CLI

Nest CLI es la herramienta de línea de comandos oficial para crear y gestionar proyectos NestJS.

```bash
# Instalación global
npm install -g @nestjs/cli

# Verificar instalación
nest --version
```

**¿Por qué instalar globalmente?**
- Disponible en cualquier directorio del sistema
- Acceso al comando `nest` desde cualquier proyecto
- Facilita la creación y generación de código

---

## Crear un nuevo proyecto

```bash
# Crear proyecto (asistente interactivo para elegir gestor de paquetes)
nest new mi-proyecto

# Crear proyecto usando npm directamente
nest new mi-proyecto --package-manager npm
```

El CLI instala automáticamente:
- Dependencias de NestJS (`@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`)
- TypeScript y su configuración (`tsconfig.json`)
- Herramientas de testing (Jest)
- Linters (ESLint + Prettier)

---

## Comandos útiles del Nest CLI

Además de crear proyectos, la CLI genera código automáticamente (*scaffolding*).

```bash
# Generar módulo
nest generate module users
nest g mo users        # abreviatura

# Generar controlador
nest generate controller users
nest g co users

# Generar servicio
nest generate service users
nest g s users

# Generar módulo + controlador + servicio a la vez
nest g resource users
```

---

# Estructura de Archivos

Explicación del *boilerplate*: `main.ts`, `app.module.ts` y más

---

## Estructura inicial del proyecto

Después de `nest new`, el proyecto tiene esta estructura:

```
mi-proyecto/
├── src/
│   ├── app.controller.spec.ts  ← tests del controlador
│   ├── app.controller.ts       ← controlador raíz
│   ├── app.module.ts           ← módulo raíz
│   ├── app.service.ts          ← servicio raíz
│   └── main.ts                 ← punto de entrada
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── nest-cli.json
├── package.json
└── tsconfig.json
```

---

## `main.ts`: Punto de entrada

Es el primer archivo que se ejecuta. Arranca la aplicación NestJS.

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
```

**Responsabilidades:**
- Crear la instancia de la app con `NestFactory`
- Configurar middleware global, CORS, pipes, etc.
- Iniciar el servidor HTTP en el puerto indicado
---

## `app.module.ts`: Módulo raíz

Es el módulo principal. Todos los demás módulos se importan aquí.

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

`@Module` es un decorador que describe cómo está organizado el módulo.

---

# Arquitectura Modular

El concepto de `@Module` como contenedor para organizar el código por dominio

---

## ¿Qué es un módulo en NestJS?

Un módulo es una **unidad funcional** que agrupa controladores, servicios y proveedores relacionados con un dominio específico.

**Ejemplos de módulos:**
- `UsersModule` → gestión de usuarios
- `ProductsModule` → catálogo de productos
- `AuthModule` → autenticación y autorización
- `DatabaseModule` → conexión a base de datos

**Regla:** cada dominio de la aplicación → un módulo propio.

---

## El decorador `@Module`

Define la estructura y dependencias de un módulo mediante cuatro propiedades:

```typescript
@Module({
  imports: [],      // Módulos externos que necesita este módulo
  controllers: [],  // Controladores que pertenecen a este módulo
  providers: [],    // Servicios/proveedores disponibles en este módulo
  exports: [],      // Proveedores que este módulo comparte con otros
})
export class UsersModule {}
```

| Propiedad | ¿Qué hace? |
|-----------|-----------|
| `imports` | Importa funcionalidad de otros módulos |
| `controllers` | Registra controladores del módulo |
| `providers` | Registra servicios inyectables |
| `exports` | Expone proveedores a otros módulos |

---

## Convenciones de nombres

NestJS sigue convenciones estrictas para facilitar la lectura y el mantenimiento.

| Tipo | Nombre del archivo | Nombre de clase |
|------|--------------------|-----------------|
| Módulo | `users.module.ts` | `UsersModule` |
| Controlador | `users.controller.ts` | `UsersController` |
| Servicio | `users.service.ts` | `UsersService` |
| DTO | `create-user.dto.ts` | `CreateUserDto` |
| Entidad | `user.entity.ts` | `User` |
| Test | `users.controller.spec.ts` | — |

---

## Módulo de feature: UsersModule

Ejemplo completo de un módulo de dominio de usuarios.

```typescript
// users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],   // disponible para otros módulos
})
export class UsersModule {}
```

---
## Módulo de feature: UsersModule

Debemos importar los módulos en el principal para que la aplicación sea capaz de utilizarlos.

```typescript
// app.module.ts
@Module({
  imports: [UsersModule],   // importar en el módulo raíz
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

---

## Módulos compartidos

Cuando varios módulos necesitan la misma funcionalidad, se crea un módulo compartido.


**Beneficio:** un único lugar para lógica transversal (logs, utilidades, helpers).


```typescript
// shared/shared.module.ts
@Module({
  providers: [LoggerService, CryptoService],
  exports: [LoggerService, CryptoService], // aquí indica lo que se podrá ver en el resto de módulos
})
export class SharedModule {}

// users/users.module.ts
@Module({
  imports: [SharedModule],   // UsersService ya puede usar LoggerService
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```
---

## Inyección de dependencias (DI)

NestJS gestiona automáticamente la creación e inyección de dependencias.

```typescript
// users/users.controller.ts
@Controller('users')
export class UsersController {
  // NestJS instancia y provee UsersService automáticamente
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

---
## Inyección de dependencias (DI)

**¿Cómo funciona?**
1. NestJS lee el tipo `UsersService` declarado en el constructor
2. Busca un proveedor registrado para ese tipo en el módulo
3. Crea (o reutiliza) la instancia y la inyecta automáticamente

---

# Arranque de la Aplicación

El flujo desde `main.ts` hasta el primer controlador

---

## Bootstrapping en `main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 1. NestFactory analiza AppModule y construye el grafo de dependencias
  const app = await NestFactory.create(AppModule);

  // 2. Configuración global (opcional)
  app.setGlobalPrefix('api');   // prefijo /api en todas las rutas
  app.enableCors();             // habilitar CORS

  // 3. Iniciar servidor HTTP
  await app.listen(3000);
  console.log('🚀 Aplicación en http://localhost:3000');
}

bootstrap();
```

---

## Flujo de una solicitud HTTP

Cuando llega una petición `GET /users`:

```
Cliente HTTP
    │
    ▼
[ Servidor Express/Fastify ]
    │
    ▼
[ Middlewares globales ]
    │
    ▼
[ Guards → Interceptors → Pipes ]
    │
    ▼
[ UsersController.findAll() ]
    │
    ▼
[ UsersService.findAll() ]
    │
    ▼
[ Respuesta JSON al cliente ]
```

---

## Ciclo de vida de la aplicación

NestJS define hooks que se ejecutan en momentos específicos del ciclo de vida.

```typescript
import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
} from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    // Se ejecuta cuando el módulo se inicializa
    console.log('Módulo inicializado');
  }

  onApplicationBootstrap() {
    // Se ejecuta cuando la app está completamente lista
    console.log('Aplicación lista para recibir peticiones');
  }
}
```

---

## Resumen del flujo de arranque

1. **`bootstrap()`** en `main.ts` es llamado
2. **`NestFactory.create(AppModule)`** analiza todos los módulos, controladores y proveedores
3. Se construye el **grafo de dependencias** y se instancian los proveedores
4. Se ejecutan los hooks **`onModuleInit`** de cada módulo
5. Se inicia el **servidor HTTP** con `app.listen()`
6. Se ejecutan los hooks **`onApplicationBootstrap`**
7. La aplicación está lista para **recibir peticiones**

---

# Recursos Adicionales

- [Documentación oficial de NestJS](https://docs.nestjs.com/)
- [Primeros pasos con NestJS](https://docs.nestjs.com/first-steps)
- [Módulos en NestJS](https://docs.nestjs.com/modules)

