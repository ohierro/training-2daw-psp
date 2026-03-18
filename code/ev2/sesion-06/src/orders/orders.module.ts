// src/orders/orders.module.ts
// Importa UsersModule para que OrdersService pueda inyectar UsersService.
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [UsersModule],      // necesario para usar UsersService aquí
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
