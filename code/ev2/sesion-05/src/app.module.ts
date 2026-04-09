// src/app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsController } from './products/products.controller';
import { BillsModule } from './bills/bills.module';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [UsersModule, BillsModule, ProductsModule, ConfigurationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
