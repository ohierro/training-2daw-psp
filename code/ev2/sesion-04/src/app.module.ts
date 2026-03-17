// src/app.module.ts
// Módulo raíz de la aplicación.
// Todos los módulos de feature se importan aquí.

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],       // Importar módulos de feature
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
