// src/orders/orders.service.ts
// Demuestra inyección de un servicio en otro:
// OrdersService depende de UsersService para validar que el usuario existe.

import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

export interface Order {
  id: number;
  user: { id: number; nombre: string };
  items: string[];
  total: number;
}

@Injectable()
export class OrdersService {
  private orders: Order[] = [];
  private nextId = 1;

  // NestJS inyecta UsersService gracias a que UsersModule lo exporta
  // y OrdersModule importa UsersModule
  constructor(private readonly usersService: UsersService) {}

  findAll(): Order[] {
    return this.orders;
  }

  createOrder(userId: number, items: string[]): Order {
    // Delegamos en UsersService para validar — no duplicamos lógica
    const user = this.usersService.findOne(userId); // lanza 404 si no existe

    const total = items.length * 10; // lógica de negocio en el servicio
    const order: Order = {
      id: this.nextId++,
      user: { id: user.id, nombre: user.nombre },
      items,
      total,
    };
    this.orders.push(order);
    return order;
  }
}
