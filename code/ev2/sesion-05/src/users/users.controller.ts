// src/users/users.controller.ts
// Controlador completo que demuestra todos los decoradores de la sesión 05:
//   @Controller, @Get, @Post, @Put, @Patch, @Delete
//   @Param, @Query, @Body, @Headers
//   @HttpCode, HttpStatus
//   NotFoundException, BadRequestException (excepciones predefinidas)

import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UsersService, User } from './users.service';

// ──────────────────────────────────────────
// @Controller('users') → prefijo de ruta /users
// Todas las rutas definidas aquí quedan bajo /users
// ──────────────────────────────────────────
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ── GET /users ──────────────────────────
  // @Query() extrae parámetros de la query string: ?page=2&role=admin
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('role') role?: string,
  ) {
    return {
      data: this.usersService.findAll(role),
      page: +page,
    };
  }

  // ── GET /users/:id ──────────────────────
  // @Param('id') extrae el segmento dinámico de la URL
  // El servicio lanza NotFoundException si no existe → NestJS responde 404
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // ── GET /users/:userId/posts/:postId ────
  // Múltiples parámetros en una misma ruta
  @Get(':userId/posts/:postId')
  findPost(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
  ) {
    return { userId: +userId, postId: +postId };
  }

  // ── POST /users ─────────────────────────
  // @Body() extrae el cuerpo de la petición (requiere express.json(), ya activo por defecto en NestJS)
  // @HttpCode(201) — NestJS usa 201 por defecto en POST, aquí se muestra cómo ser explícito
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() body: { nombre: string; email: string; role?: string },
    @Headers('x-request-id') requestId?: string,
  ) {
    const { nombre, email, role = 'user' } = body;

    // Validación manual (sin pipes todavía — se verá en sesión 07)
    if (!nombre || !email) {
      throw new BadRequestException('nombre y email son obligatorios');
    }

    const usuario = this.usersService.create({ nombre, email, role });

    // Devolver junto con el header recibido (solo para demostración)
    return { usuario, requestId };
  }

  // ── PUT /users/:id ──────────────────────
  // Reemplaza el recurso completo (todos los campos obligatorios)
  @Put(':id')
  replace(
    @Param('id') id: string,
    @Body() body: { nombre: string; email: string; role: string },
  ) {
    const { nombre, email, role } = body;
    if (!nombre || !email || !role) {
      throw new BadRequestException('PUT requiere: nombre, email y role');
    }
    return this.usersService.replace(+id, { nombre, email, role });
  }

  // ── PATCH /users/:id ────────────────────
  // Actualización parcial: solo los campos enviados se modifican
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Omit<User, 'id'>>,
  ) {
    return this.usersService.update(+id, body);
  }

  // ── DELETE /users/:id ───────────────────
  // 204 No Content — no devuelve body
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.usersService.remove(+id);
    // Sin return: el cuerpo de respuesta estará vacío (204)
  }
}
