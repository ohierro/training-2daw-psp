// src/users/users.service.ts
// Servicio del módulo users: contiene la lógica de negocio.
// Demuestra lifecycle hooks y la separación del servicio respecto al controlador.

import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

interface User {
  id: number;
  nombre: string;
  email: string;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private users: User[] = [];

  // Hook: se ejecuta al inicializar el módulo — ideal para cargar datos iniciales
  onModuleInit() {
    this.users = [
      { id: 1, nombre: 'Ana García', email: 'ana@example.com' },
      { id: 2, nombre: 'Luis Pérez', email: 'luis@example.com' },
      { id: 3, nombre: 'María López', email: 'maria@example.com' },
    ];
    console.log(`[UsersService] onModuleInit → ${this.users.length} usuarios cargados`);
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }
}
