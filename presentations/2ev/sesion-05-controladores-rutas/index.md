# Sesión 5: Controladores y Rutas en NestJS

## Objetivos de Aprendizaje

Dominar la creación de controladores y rutas en NestJS para manejar las solicitudes HTTP.

## Contenidos

### Decoradores de clase

Uso de `@Controller('path')`.

- El decorador `@Controller`
- Definición del prefijo de ruta
- Anidamiento de rutas
- Convenciones de nombres
- Controladores y separación de responsabilidades

### Decoradores de método

`@Get()`, `@Post()`, `@Put()`, `@Delete()`.

- Decoradores HTTP básicos
- Rutas dinámicas en decoradores
- Especificidad de rutas
- Múltiples decoradores en un método
- Otros métodos HTTP (PATCH, OPTIONS, HEAD)

### Manejo de la petición

Acceso a datos mediante `@Param()`, `@Query()` y `@Body()`.

- Parámetros de ruta con `@Param()`
- Parámetros de query con `@Query()`
- Body de la solicitud con `@Body()`
- Acceso a headers con `@Headers()`
- Acceso al objeto request con `@Req()`
- Acceso al objeto response con `@Res()`

### Respuestas HTTP

Uso de `@HttpCode()` y manejo básico de excepciones con `HttpException`.

- Códigos de estado con `@HttpCode()`
- Respuestas con status diferentes
- El decorador `@HttpException`
- Excepciones HTTP predefinidas
- Manejo de errores básico
- Respuestas personalizadas

## Recursos Adicionales

- [Documentación de Controllers en NestJS](https://docs.nestjs.com/controllers)
- [Decoradores y parámetros en NestJS](https://docs.nestjs.com/custom-decorators)
