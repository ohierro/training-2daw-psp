# Sesión 7: Validación de Datos (DTOs) y Pipes

## Objetivos de Aprendizaje

Implementar validación robusta de datos y transformación automática con DTOs y Pipes.

## Contenidos

### Data Transfer Objects (DTO)

Definición de clases para la entrada de datos.

- Qué es un DTO
- Diferencia entre DTO y modelos
- Patrón DTO en arquitectura de capas
- Ventajas de usar DTOs
- Estructura de una clase DTO
- DTOs para diferentes operaciones (create, update)

### Validación automática

Uso de `class-validator` y `class-transformer` (decoradores `@IsString`, `@IsInt`, etc.).

- Instalación de `class-validator`
- Decoradores de validación comunes
- `@IsString()`, `@IsInt()`, `@IsEmail()`, `@IsNotEmpty()`
- Validadores personalizados
- Mensajes de error personalizados
- Validación condicional

### ValidationPipe

Configuración global para que Nest valide automáticamente el `@Body` de las peticiones.

- El `ValidationPipe` de NestJS
- Aplicación global del pipe
- Aplicación a nivel de controlador
- Aplicación a nivel de parámetro
- Opciones del ValidationPipe
- Transformación automática de tipos

### Transformación de datos

Convertir tipos automáticamente (ej: de string a number en parámetros).

- Uso de `class-transformer`
- El decorador `@Transform()`
- Conversión de tipos
- Exclusión de propiedades
- Exposición selectiva de propiedades
- Transformación en pipes personalizados

## Recursos Adicionales

- [Documentación de Pipes en NestJS](https://docs.nestjs.com/pipes)
- [Validación en NestJS](https://docs.nestjs.com/techniques/validation)
- [class-validator](https://github.com/typestack/class-validator)
- [class-transformer](https://github.com/typestack/class-transformer)
