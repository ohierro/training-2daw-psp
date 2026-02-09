# Sesión 8: Persistencia de Datos Inicial (TypeORM)

## Objetivos de Aprendizaje

Aprender a persistir datos en una base de datos usando TypeORM, el ORM estándar de NestJS.

## Contenidos

### Configuración de TypeORM

Conexión a una base de datos (SQLite o PostgreSQL) mediante `TypeOrmModule`.

- Instalación de TypeORM y drivers de BD
- Configuración del `TypeOrmModule.forRoot()`
- Opciones de conexión
- Entorno de desarrollo (SQLite) vs producción (PostgreSQL)
- Variables de entorno para credenciales
- Alternativas: use of `ormconfig.json`

### Entidades

Definición de la estructura de la tabla usando decoradores de TypeORM (`@Entity`, `@PrimaryGeneratedColumn`, `@Column`).

- Decorador `@Entity`
- Decorador `@PrimaryGeneratedColumn`
- Tipos de campos con `@Column`
- Tipos de datos SQL y mapeo
- Índices con `@Index`
- Relaciones básicas (`@OneToMany`, `@ManyToOne`)
- Propiedades opcionales y valores por defecto

### Repositorios

Uso de `Repository` para realizar operaciones CRUD (find, save, delete) dentro de los servicios.

- Inyección del repositorio en servicios
- Decorador `@InjectRepository()`
- Métodos principales: `find()`, `findOne()`, `save()`, `update()`, `delete()`
- Queries avanzadas con `QueryBuilder`
- Transacciones básicas
- Relaciones en queries

### Cierre del flujo

Integración final: Controlador -> Servicio -> Repositorio -> BD.

- Flujo completo de una solicitud
- Manejo de errores en la capa de persistencia
- Transacciones y consistencia
- Patrones de diseño en CRUD
- Testing de la capa de persistencia
- Buenas prácticas

## Recursos Adicionales

- [Documentación de TypeORM](https://typeorm.io/)
- [Integración de TypeORM con NestJS](https://docs.nestjs.com/techniques/database)
- [Tutorial de TypeORM](https://typeorm.io/example)

## Proyecto Final

Al completar esta sesión, tendrás una aplicación completa con:
- Servidor Express/NestJS
- Controladores manejando solicitudes HTTP
- Servicios con lógica de negocio
- Persistencia de datos en una base de datos
- Validación de datos entrada
