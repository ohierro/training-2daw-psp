// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);
  console.log(`🚀 Aplicación en http://localhost:${PORT}`);
  console.log('📂 Base de datos: database.sqlite (creada automáticamente)');
}

bootstrap();
