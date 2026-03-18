// src/orders/orders.controller.ts
import {
  Controller, Get, Post, Body, HttpCode, HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: { userId: number; items: string[] }) {
    return this.ordersService.createOrder(body.userId, body.items);
  }
}
