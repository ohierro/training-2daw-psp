// src/counter/counter.module.ts
// CounterService se registra UNA vez. NestJS reutiliza la misma instancia
// en CounterAController y CounterBController → patrón Singleton.

import { Module } from '@nestjs/common';
import { CounterService } from './counter.service';
import { CounterAController } from './counter-a.controller';
import { CounterBController } from './counter-b.controller';

@Module({
  controllers: [CounterAController, CounterBController],
  providers: [CounterService],
})
export class CounterModule {}
