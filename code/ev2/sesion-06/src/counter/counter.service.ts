// src/counter/counter.service.ts
// Demuestra el patrón Singleton:
// NestJS crea UNA SOLA instancia de este servicio y la comparte
// entre ControllerA y ControllerB del mismo módulo.

import { Injectable } from '@nestjs/common';

@Injectable()
export class CounterService {
  private count = 0;

  increment(): number {
    this.count++;
    console.log(`[CounterService] incrementado → ${this.count} (instancia: ${(this as any)._instanceId})`);
    return this.count;
  }

  getCount(): number {
    return this.count;
  }

  // Utilidad para identificar la instancia (solo para demostración)
  getInstanceId(): string {
    if (!(this as any)._instanceId) {
      (this as any)._instanceId = Math.random().toString(36).slice(2, 7);
    }
    return (this as any)._instanceId;
  }
}
