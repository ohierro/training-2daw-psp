import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
    imports: [ConfigurationModule],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
