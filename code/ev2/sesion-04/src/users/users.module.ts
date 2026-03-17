// src/users/users.module.ts
// Módulo de feature 'users'.
// Agrupa el controlador y servicio del dominio de usuarios.
// Exporta UsersService para que otros módulos puedan usarlo.

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // disponible para otros módulos que importen UsersModule
})
export class UsersModule {}
