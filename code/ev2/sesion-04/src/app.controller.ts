// src/app.controller.ts
// Controlador raíz: maneja las rutas bajo el prefijo del decorador @Controller.
// Delega la lógica al AppService (no contiene lógica de negocio directamente).

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Prefijo vacío → ruta base /
export class AppController {
  // NestJS inyecta AppService automáticamente por el constructor
  constructor(private readonly appService: AppService) {}

  @Get() // GET /
  getHello(): string {
    return this.appService.getHello();
  }
}
