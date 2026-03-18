// src/users/users.module.ts
// Exporta UsersService para que otros módulos puedan inyectarlo.

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],   // ← permite que OrdersModule lo use
})
export class UsersModule {}
