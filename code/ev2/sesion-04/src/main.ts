// src/main.ts
// Punto de entrada de la aplicación NestJS.
// NestFactory analiza AppModule, construye el grafo de dependencias
// y arranca el servidor HTTP.

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 1. Crear instancia de la aplicación
  const app = await NestFactory.create(AppModule);

  // 2. Configuración global opcional
  app.setGlobalPrefix(''); // sin prefijo — rutas desde /
  app.enableCors();

  // 3. Arrancar servidor HTTP
  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);

  console.log(`🚀 Aplicación iniciada en http://localhost:${PORT}`);
}

bootstrap();
