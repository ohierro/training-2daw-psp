// src/counter/counter-a.controller.ts
// Controlador A: incrementa el contador.
// Comparte la MISMA instancia de CounterService con ControllerB.

import { Controller, Post } from '@nestjs/common';
import { CounterService } from './counter.service';

@Controller('counter/a')
export class CounterAController {
  constructor(private readonly counter: CounterService) {}

  // POST /counter/a/inc → incrementa y devuelve el nuevo valor
  @Post('inc')
  increment() {
    const newValue = this.counter.increment();
    return {
      accion: 'incrementado desde ControllerA',
      valor: newValue,
      instanciaId: this.counter.getInstanceId(),
    };
  }
}
