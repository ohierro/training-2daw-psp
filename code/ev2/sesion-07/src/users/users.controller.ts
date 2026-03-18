// src/users/users.controller.ts
import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, Query, HttpCode, HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: string) {
    return this.usersService.findAll(role);
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.usersService.search(q ?? '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get(':id/con-productos')
  findWithProducts(@Param('id') id: string) {
    return this.usersService.findOneWithProducts(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: { nombre: string; email: string; role?: string }) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<{ nombre: string; email: string; role: string; activo: boolean }>) {
    return this.usersService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
