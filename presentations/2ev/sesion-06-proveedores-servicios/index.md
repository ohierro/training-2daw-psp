# Sesión 6: Proveedores y Servicios (Inyección de Dependencias)

## Objetivos de Aprendizaje

Entender la inyección de dependencias en NestJS y cómo crear servicios reutilizables.

## Contenidos

### El decorador @Injectable

Creación de servicios para la lógica de negocio.

- El decorador `@Injectable`
- Qué es un servicio
- Convención de nombres (`.service.ts`)
- Responsabilidades de un servicio
- Métodos en servicios

### Inyección de Dependencias (DI)

Cómo Nest instancia y "inyecta" los servicios en el constructor del controlador.

- Concepto de inyección de dependencias
- Constructor injection
- Property injection
- Proveedores en NestJS
- Ciclo de vida de los proveedores
- Bootstrapping automático

### Singletons

Explicar que los servicios son instancias únicas por defecto.

- Patrón Singleton
- Servicios como singletons en NestJS
- Ciclo de vida de aplicación
- Instancias compartidas
- Implicaciones de rendimiento

### Separación de responsabilidades

Por qué el controlador solo debe recibir/enviar datos y el servicio procesarlos.

- Patrón MVC en NestJS
- Responsabilidades del controlador
- Responsabilidades del servicio
- Lógica de negocio vs lógica de transporte
- Testabilidad mejora con esta separación
- Ejemplos prácticos

## Recursos Adicionales

- [Documentación de Providers en NestJS](https://docs.nestjs.com/providers)
- [Inyección de Dependencias en NestJS](https://docs.nestjs.com/fundamentals/dependency-injection)
- [Ciclo de vida de los proveedores](https://docs.nestjs.com/fundamentals/lifecycle-events)
