// src/app.service.ts
// Servicio raíz: contiene la lógica de negocio para AppController.
// @Injectable() permite que NestJS lo gestione e inyecte donde se necesite.

import { Injectable, OnModuleInit, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit, OnApplicationBootstrap {

  // Hook del ciclo de vida: se ejecuta cuando el módulo se inicializa
  onModuleInit() {
    console.log('[AppService] onModuleInit → módulo inicializado');
  }

  // Hook del ciclo de vida: se ejecuta cuando la aplicación está lista
  onApplicationBootstrap() {
    console.log('[AppService] onApplicationBootstrap → app lista para recibir peticiones');
  }

  getHello(): string {
    return '¡Hola desde NestJS! Visita /users para ver el módulo de usuarios.';
  }
}
