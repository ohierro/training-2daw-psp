// src/app.module.ts
// TypeOrmModule.forRoot() conecta la aplicación a SQLite.
// synchronize: true → TypeORM crea/actualiza las tablas automáticamente.
// Solo en desarrollo; en producción usar migraciones.

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',  // archivo local, se crea si no existe
      entities: [User, Product],
      synchronize: true,            // ⚠️ solo en desarrollo
      logging: ['query', 'error'],  // muestra el SQL generado en consola
    }),
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}
