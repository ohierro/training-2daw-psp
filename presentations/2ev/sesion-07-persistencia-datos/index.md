---
marp: true
theme: psp
footer: '2DAM - PSP'
paginate: true
---

# Sesión 7: Persistencia de Datos

TypeORM con NestJS

---

## Objetivos de Aprendizaje

- Configurar **TypeORM** y conectarlo a una base de datos desde NestJS
- Definir la estructura de tablas con **entidades** y decoradores
- Realizar operaciones CRUD con **repositorios**
- Entender el flujo completo: Controlador → Servicio → Repositorio → BD

---

# Configuración de TypeORM

Conexión a la base de datos mediante `TypeOrmModule`

---

## Instalación

TypeORM es el ORM estándar integrado en NestJS. Soporta múltiples motores de BD.

```bash
# TypeORM + NestJS integration
npm install @nestjs/typeorm typeorm

# Driver SQLite (desarrollo)
npm install sqlite3

# Driver PostgreSQL (producción)
npm install pg
```

---

## `TypeOrmModule.forRoot()` — SQLite (desarrollo)

Se configura en el módulo raíz para que toda la app tenga acceso.

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',   // archivo local
      entities: [User],
      synchronize: true,             // crea/actualiza tablas automáticamente
    }),
  ],
})
export class AppModule {}
```

> `synchronize: true` solo en **desarrollo**. En producción usar migraciones.

---

## `TypeOrmModule.forRoot()` — PostgreSQL (producción)

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Product, Order],
  synchronize: false,           // usar migraciones en producción
})
```

Variables de entorno en `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=miapp
DB_PASS=secreto
DB_NAME=miapp_db
```

---

## Entorno de desarrollo vs producción

| Aspecto | Desarrollo (SQLite) | Producción (PostgreSQL) |
|---------|---------------------|-------------------------|
| **Instalación** | Sin servidor, archivo local | Servidor de BD |
| **`synchronize`** | `true` (cómodo) | `false` (seguro) |
| **Cambios de esquema** | Automáticos | Migraciones controladas |
| **Rendimiento** | Suficiente para dev | Alta concurrencia |
| **Uso** | Local, pruebas | Despliegue real |

---

# Entidades

Definición de la estructura de la tabla con decoradores de TypeORM

---

## El decorador `@Entity`

Una entidad es una clase TypeScript que TypeORM mapea a una tabla de la BD.

```typescript
// users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')        // nombre de la tabla
export class User {

  @PrimaryGeneratedColumn()     // id autoincremental
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'user' })
  role: string;
}
```

---

## Tipos de columnas con `@Column`

```typescript
@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()                             // VARCHAR (inferido de string)
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ nullable: true })           // columna opcional
  descripcion: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creadoEn: Date;
}
```

---

## Relaciones: `@OneToMany` y `@ManyToOne`

Modelar relaciones entre entidades.

```typescript
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];              // un usuario tiene muchos pedidos
}
```

```typescript
// order.entity.ts
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;                   // un pedido pertenece a un usuario
}
```

---

## Índices con `@Index`

Mejorar el rendimiento de búsquedas frecuentes.

```typescript
import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()                      // índice en columna única
  @Column({ unique: true })
  email: string;

  @Column()
  nombre: string;
}

// Índice compuesto en múltiples columnas
@Entity()
@Index(['nombre', 'email'])
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;
  @Column() nombre: string;
  @Column() email: string;
}
```

---

# Repositorios

Operaciones CRUD dentro de los servicios

---

## Inyectar el repositorio en el servicio

TypeORM proporciona un `Repository<T>` genérico con métodos CRUD listos.

```typescript
// users/users.module.ts
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // registrar la entidad
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
```

```typescript
// users/users.service.ts
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
}
```

---

## Métodos principales del repositorio

```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(data);  // instancia sin guardar
    return this.usersRepository.save(user);           // guarda en BD
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
```

---

## Búsquedas avanzadas con `find`

```typescript
// Buscar con condiciones
findByRole(role: string): Promise<User[]> {
  return this.usersRepository.find({
    where: { role },
    order: { nombre: 'ASC' },
    take: 10,          // LIMIT 10
    skip: 0,           // OFFSET 0
  });
}

// Buscar con relaciones cargadas
findWithOrders(id: number): Promise<User> {
  return this.usersRepository.findOne({
    where: { id },
    relations: ['orders'],    // carga la relación OneToMany
  });
}

// Verificar existencia
existsByEmail(email: string): Promise<boolean> {
  return this.usersRepository.existsBy({ email });
}
```

---

## QueryBuilder para queries complejas

Cuando los métodos básicos no son suficientes.

```typescript
findActiveUsersWithOrders(): Promise<User[]> {
  return this.usersRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.orders', 'order')
    .where('user.activo = :activo', { activo: true })
    .andWhere('order.total > :min', { min: 50 })
    .orderBy('user.nombre', 'ASC')
    .getMany();
}
```

Equivalente SQL:
```sql
SELECT user.*, order.*
FROM users user
LEFT JOIN orders order ON order.userId = user.id
WHERE user.activo = true AND order.total > 50
ORDER BY user.nombre ASC;
```

---

# Cierre del Flujo

Controlador → Servicio → Repositorio → BD

---

## Flujo completo de una solicitud POST

```
Cliente: POST /users  { nombre, email }
         │
         ▼
UsersController.create(@Body() dto)
  │  valida parámetros HTTP, llama al servicio
  ▼
UsersService.create(dto)
  │  aplica lógica de negocio (validaciones, cálculos)
  ▼
Repository<User>.save(user)
  │  genera SQL INSERT
  ▼
Base de datos
  │  guarda registro, genera id autoincremental
  ▼
UsersService ← devuelve User con id
  ▼
UsersController ← devuelve User con id
  ▼
Cliente: 201 Created  { id, nombre, email }
```

---

## Implementación completa: controlador

```typescript
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: string) {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: { nombre: string; email: string }) {
    return this.usersService.create(body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
```

---

## Manejo de errores en la capa de persistencia

```typescript
@Injectable()
export class UsersService {

  async create(data: Partial<User>): Promise<User> {
    try {
      const user = this.usersRepository.create(data);
      return await this.usersRepository.save(user);
    } catch (error) {
      // Error de constraint UNIQUE (email duplicado)
      if (error.code === 'SQLITE_CONSTRAINT' || error.code === '23505') {
        throw new ConflictException('El email ya está registrado');
      }
      throw new InternalServerErrorException('Error al guardar el usuario');
    }
  }

  async findOneOrFail(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return user;
  }
}
```

---

## Resumen del flujo completo

```
src/
├── app.module.ts              TypeOrmModule.forRoot() → conexión a BD
└── users/
    ├── users.module.ts        TypeOrmModule.forFeature([User]) → repositorio
    ├── user.entity.ts         @Entity → define tabla en BD
    ├── users.controller.ts    @Controller → capa HTTP
    └── users.service.ts       @Injectable + @InjectRepository → lógica + BD
```

**Reglas de diseño:**
1. El **controlador** no accede nunca al repositorio directamente
2. El **servicio** no conoce nada de HTTP (no usa `req`/`res`)
3. La **entidad** solo describe estructura, sin lógica
4. Los **errores de BD** se transforman en `HttpException` en el servicio

---

# Recursos Adicionales

- [Documentación de TypeORM](https://typeorm.io/)
- [Integración de TypeORM con NestJS](https://docs.nestjs.com/techniques/database)
- [Repository API](https://typeorm.io/repository-api)
