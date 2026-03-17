// src/users/users.service.ts
// Servicio con lógica CRUD en memoria.
// En un proyecto real se conectaría a una base de datos.

import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: number;
  nombre: string;
  email: string;
  role: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, nombre: 'Ana García', email: 'ana@example.com', role: 'admin' },
    { id: 2, nombre: 'Luis Pérez', email: 'luis@example.com', role: 'user' },
    { id: 3, nombre: 'María López', email: 'maria@example.com', role: 'user' },
  ];
  private nextId = 4;

  findAll(role?: string): User[] {
    return role ? this.users.filter(u => u.role === role) : this.users;
  }

  findOne(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    return user;
  }

  create(data: Omit<User, 'id'>): User {
    const nuevo: User = { id: this.nextId++, ...data };
    this.users.push(nuevo);
    return nuevo;
  }

  replace(id: number, data: Omit<User, 'id'>): User {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    this.users[idx] = { id, ...data };
    return this.users[idx];
  }

  update(id: number, data: Partial<Omit<User, 'id'>>): User {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    this.users[idx] = { ...this.users[idx], ...data };
    return this.users[idx];
  }

  remove(id: number): void {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    this.users.splice(idx, 1);
  }
}
