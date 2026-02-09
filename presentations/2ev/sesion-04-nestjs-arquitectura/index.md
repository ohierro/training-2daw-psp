# Sesión 4: Hola, NestJS: Arquitectura

## Objetivos de Aprendizaje

Entender la arquitectura de NestJS y cómo está organizado un proyecto NestJS desde el principio.

## Contenidos

### Nest CLI

Instalación global y creación del proyecto con `nest new`.

- Instalación de NestJS CLI
- Creación de un nuevo proyecto
- Estructura inicial del proyecto
- Dependencias automáticas

### Estructura de archivos

Explicación del *boilerplate* (main.ts, app.module.ts).

- `main.ts`: Punto de entrada de la aplicación
- `app.module.ts`: Módulo raíz
- `app.controller.ts`: Controlador raíz
- `app.service.ts`: Servicio raíz
- Estructura de carpetas recomendada
- Convenciones de nombres

### Arquitectura modular

El concepto de `@Module` como contenedor para organizar el código por dominio (ej: UsersModule, ProductsModule).

- El decorador `@Module`
- Componentes de un módulo: controllers, providers, imports, exports
- Modularidad y separación de responsabilidades
- Módulos de features
- Módulos compartidos
- Inyección de dependencias a nivel de módulo

### Arranque de la aplicación

Entender el flujo desde `main.ts` hasta el primer controlador.

- Bootstrapping en `main.ts`
- Creación de la aplicación NestFactory
- Inicialización de módulos
- Flujo de solicitud desde HTTP al controlador
- Ciclo de vida de la aplicación

## Recursos Adicionales

- [Documentación oficial de NestJS](https://docs.nestjs.com/)
- [Arquitectura de NestJS](https://docs.nestjs.com/first-steps)
- **Recomendación:** [Curso de NestJS para principiantes](https://www.youtube.com/watch?v=1hpc70_OoAg) - Explica visualmente la arquitectura de NestJS

## Notas para el Instructor

Este video es muy útil porque cubre desde la instalación de Node.js hasta la creación de rutas, ideal para reforzar los conceptos de las primeras sesiones de tu calendario.
