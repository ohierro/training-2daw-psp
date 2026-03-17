---
marp: true
theme: psp
footer: '2DAM - PSP'
paginate: true
---

# Sesión 5: Controladores y Rutas en NestJS

---

## Objetivos de Aprendizaje

- Crear **controladores** con `@Controller` y definir prefijos de ruta
- Manejar los métodos HTTP con decoradores: `@Get`, `@Post`, `@Put`, `@Delete`
- Acceder a datos de la petición: `@Param`, `@Query`, `@Body`
- Controlar las **respuestas HTTP**: códigos de estado y excepciones

---

# Decoradores de Clase

Uso de `@Controller('path')` para definir rutas base

---

## El decorador `@Controller`

`@Controller` define el prefijo de ruta para todos los métodos del controlador.

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('users')    // prefijo: /users
export class UsersController {

  @Get()                // GET /users
  findAll() {
    return 'Lista de usuarios';
  }
}
```

**Sin prefijo:**
```typescript
@Controller()           // rutas desde /
export class AppController {}
```

---

## Anidamiento de rutas

Los decoradores de método añaden subrutas al prefijo del controlador.

```typescript
@Controller('products')        // /products
export class ProductsController {

  @Get()                       // GET /products
  findAll() { ... }

  @Get('featured')             // GET /products/featured
  getFeatured() { ... }

  @Get(':id/reviews')          // GET /products/:id/reviews
  getReviews(@Param('id') id: string) { ... }
}
```

La ruta completa = **prefijo del controlador** + **ruta del método**.

---

## Separación de responsabilidades

Cada controlador gestiona un único recurso o dominio.

```
src/
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts    ← solo rutas de usuarios
│   └── users.service.ts
├── products/
│   ├── products.module.ts
│   ├── products.controller.ts ← solo rutas de productos
│   └── products.service.ts
└── app.module.ts
```

**Principio:** un controlador no accede a la lógica de otro dominio directamente, lo hace a través de sus servicios.

---

# Decoradores de Método

`@Get()`, `@Post()`, `@Put()`, `@Delete()` y más

---

## Decoradores HTTP básicos

Cada decorador mapea un método del controlador a un verbo HTTP y una ruta.

```typescript
import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get()            // GET /users
  findAll() { ... }

  @Post()           // POST /users
  create() { ... }

  @Put(':id')       // PUT /users/:id
  update() { ... }

  @Delete(':id')    // DELETE /users/:id
  remove() { ... }
}
```

---

## Rutas dinámicas en decoradores

Los segmentos de ruta que empiezan con `:` son parámetros dinámicos.

```typescript
@Controller('users')
export class UsersController {

  @Get(':id')                         // GET /users/42
  findOne(@Param('id') id: string) {
    return `Usuario con id: ${id}`;
  }

  @Get(':userId/posts/:postId')       // GET /users/1/posts/5
  findPost(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
  ) {
    return { userId, postId };
  }
}
```

---

## Otros métodos HTTP

NestJS soporta todos los verbos HTTP estándar.

```typescript
import {
  Get, Post, Put, Delete,
  Patch, Options, Head,
} from '@nestjs/common';

@Controller('resources')
export class ResourcesController {

  @Patch(':id')     // actualización parcial
  partialUpdate() { ... }

  @Head(':id')      // solo devuelve headers, sin body
  checkExists() { ... }

  @Options()        // describe las opciones disponibles (CORS preflight)
  options() { ... }
}
```

---

# Manejo de la Petición

Acceso a datos mediante `@Param()`, `@Query()` y `@Body()`

---

## Parámetros de ruta con `@Param()`

Extraen segmentos dinámicos de la URL.

```typescript
@Controller('users')
export class UsersController {

  // Obtener un parámetro específico
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Usuario ${id}`;
  }

  // Obtener todos los parámetros como objeto
  @Get(':category/:id')
  findInCategory(@Param() params: { category: string; id: string }) {
    return params;
  }
}
```

`GET /users/42` → `id = '42'`

---

## Parámetros de query con `@Query()`

Extraen los parámetros de la query string (`?clave=valor`).

```typescript
@Controller('users')
export class UsersController {

  // GET /users?page=2&limit=10&role=admin
  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('role') role: string,
  ) {
    return { page, limit, role };
  }

  // Obtener toda la query como objeto
  @Get('search')
  search(@Query() query: Record<string, string>) {
    return query;
  }
}
```

---

## Body de la solicitud con `@Body()`

Extrae el cuerpo de la petición (tipicamente en POST/PUT/PATCH).

```typescript
@Controller('users')
export class UsersController {

  @Post()
  create(@Body() body: { name: string; email: string }) {
    return `Creando usuario: ${body.name}`;
  }

  // Extraer solo un campo del body
  @Post('register')
  register(@Body('email') email: string) {
    return `Registrando: ${email}`;
  }
}
```

> **Nota:** Para validar el body se usan **DTOs** con `class-validator` (se verá en la siguiente sesión).

---

## Acceso a headers y objetos nativos

```typescript
import { Controller, Get, Headers, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('info')
export class InfoController {

  // Leer un header específico
  @Get('auth')
  getAuth(@Headers('authorization') auth: string) {
    return { token: auth };
  }

  // Acceso al objeto Request completo de Express
  @Get('request')
  getRaw(@Req() req: Request) {
    return { url: req.url, method: req.method };
  }
}
```

> Usar `@Req()` / `@Res()` directamente acopla el código a Express; preferir siempre los decoradores específicos.

---

# Respuestas HTTP

Uso de `@HttpCode()` y manejo de errores con `HttpException`

---

## Códigos de estado por defecto

NestJS asigna códigos de estado HTTP automáticamente según el método.

| Método | Código por defecto | Significado |
|--------|--------------------|-------------|
| `@Get` | `200 OK` | Recurso devuelto |
| `@Post` | `201 Created` | Recurso creado |
| `@Put` / `@Patch` | `200 OK` | Recurso actualizado |
| `@Delete` | `200 OK` | Recurso eliminado |

---

## Personalizar el código con `@HttpCode()`

```typescript
import { Controller, Post, Delete, HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)    // 202 en vez de 201
  create() {
    return 'Aceptado para procesamiento';
  }

  @Delete(':id')
  @HttpCode(204)                    // 204 No Content
  remove() {
    // sin body de respuesta
  }
}
```

`HttpStatus` es un enum con todos los códigos estándar (`OK`, `CREATED`, `NOT_FOUND`, etc.).

---

## Excepciones HTTP con `HttpException`

Cuando algo falla, NestJS gestiona la excepción y devuelve la respuesta adecuada.

```typescript
import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.usersService.findById(id);

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
```

Respuesta automática:
```json
{ "statusCode": 404, "message": "Usuario no encontrado" }
```

---

## Excepciones predefinidas

NestJS incluye clases de excepción listas para usar, más expresivas que `HttpException`.

```typescript
import {
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';

// En lugar de: throw new HttpException('...', 404)
throw new NotFoundException('Usuario no encontrado');
throw new BadRequestException('El email no es válido');
throw new UnauthorizedException('Token inválido');
throw new ForbiddenException('Sin permisos suficientes');
throw new ConflictException('El email ya está registrado');
```

---

## Controlador completo: ejemplo integrador

```typescript
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()                                            // GET /users?page=1
  findAll(@Query('page') page = 1) {
    return this.usersService.findAll(page);
  }

  @Get(':id')                                       // GET /users/42
  findOne(@Param('id') id: string) {
    const user = this.usersService.findById(+id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Post()                                           // POST /users
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: { name: string }) {
    return this.usersService.create(body);
  }

  @Delete(':id')                                    // DELETE /users/42
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.usersService.remove(+id);
  }
}
```

---

# Recursos Adicionales

- [Documentación de Controllers en NestJS](https://docs.nestjs.com/controllers)
- [Decoradores y parámetros en NestJS](https://docs.nestjs.com/custom-decorators)
- [HttpStatus en NestJS](https://docs.nestjs.com/exception-filters)
