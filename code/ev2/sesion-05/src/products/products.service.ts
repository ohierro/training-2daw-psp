import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class ProductsService {
    private products = [
        { id: 1, name: 'Producto A', price: 10.99 },
        { id: 2, name: 'Producto B', price: 19.99 },
        { id: 3, name: 'Producto C', price: 5.49 },
    ];
    private idCounter = 3;

    constructor(private readonly configurationService: ConfigurationService) {}


    findAll() {
        console.log('Obteniendo credenciales AWS desde ConfigurationService:', this.configurationService.getAWSCredentials());
        return this.products;
    }

    findOne(id: number) {
        return this.products.find(p => p.id === id);
    }
}
