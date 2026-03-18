// src/users/users.service.ts
// Demuestra @Injectable y las responsabilidades de un servicio:
// toda la lógica de negocio vive aquí, sin conocer HTTP.

import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: number;
  nombre: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, nombre: 'Ana García', email: 'ana@example.com' },
    { id: 2, nombre: 'Luis Pérez', email: 'luis@example.com' },
  ];
  private nextId = 3;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return user;
  }

  create(data: { nombre: string; email: string }): User {
    const user: User = { id: this.nextId++, ...data };
    this.users.push(user);
    return user;
  }

  update(id: number, data: Partial<Omit<User, 'id'>>): User {
    const user = this.findOne(id);
    Object.assign(user, data);
    return user;
  }

  remove(id: number): void {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) throw new NotFoundException(`Usuario ${id} no encontrado`);
    this.users.splice(idx, 1);
  }
}
