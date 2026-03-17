// src/users/users.controller.ts
// Controlador del módulo users.
// Recibe peticiones HTTP y delega en UsersService.

import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // Prefijo: /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()          // GET /users
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')     // GET /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
