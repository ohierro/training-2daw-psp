// src/products/products.service.ts
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  findAll(activo?: string): Promise<Product[]> {
    if (activo !== undefined) {
      return this.productsRepository.find({
        where: { activo: activo === 'true' },
        order: { nombre: 'ASC' },
      });
    }
    return this.productsRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) throw new NotFoundException(`Producto ${id} no encontrado`);
    return product;
  }

  async create(data: Partial<Product>): Promise<Product> {
    try {
      const product = this.productsRepository.create(data);
      return await this.productsRepository.save(product);
    } catch {
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  async update(id: number, data: Partial<Product>): Promise<Product> {
    await this.findOne(id);
    await this.productsRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.productsRepository.delete(id);
  }
}
