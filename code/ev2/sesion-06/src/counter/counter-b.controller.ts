// src/counter/counter-b.controller.ts
// Controlador B: lee el contador.
// Aunque se inyecta por separado, NestJS entrega la MISMA instancia de CounterService.
// El instanciaId será idéntico al de ControllerA, demostrando el Singleton.

import { Controller, Get } from '@nestjs/common';
import { CounterService } from './counter.service';

@Controller('counter/b')
export class CounterBController {
  constructor(private readonly counter: CounterService) {}

  // GET /counter/b → lee el valor actual
  @Get()
  getCount() {
    return {
      mensaje: 'Leyendo desde ControllerB — misma instancia que ControllerA',
      valor: this.counter.getCount(),
      instanciaId: this.counter.getInstanceId(), // igual que en ControllerA
    };
  }
}
