// src/app.module.ts
// Módulo raíz: importa los tres módulos de feature
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { CounterModule } from './counter/counter.module';

@Module({
  imports: [UsersModule, OrdersModule, CounterModule],
})
export class AppModule {}
