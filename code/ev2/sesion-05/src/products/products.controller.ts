import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    public findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ) {
        console.log(`Página: ${page}, Límite: ${limit}`);
        // return this.products;
        return this.productsService.findAll();
    }

    // @Get(':id')
    // public findOne(@Param('id') id: string) {
    //     const product = this.products.find(p => p.id === +id);

    //     if (!product) {
    //         throw new NotFoundException(`Producto con id ${id} no encontrado`);
    //     }
    //     return product;
    // }

    // @Post()
    // public create(@Body() createProductDto: CreateProductDto) {
    //     if (!createProductDto.name || !createProductDto.price) {
    //         throw new BadRequestException('El nombre y el precio son obligatorios');
    //     }
    //     const newProduct = {
    //         id: ++this.idCounter,
    //         ...createProductDto,
    //     };
    //     this.products.push(newProduct);
    //     return newProduct;
    // }

    // @Patch(':id')
    // public update(@Param('id') id: string, @Body() updateProductDto: Partial<CreateProductDto>) {
    //     const productIndex = this.products.findIndex(p => p.id === +id);

    //     if (productIndex === -1) {
    //         throw new NotFoundException(`Producto con id ${id} no encontrado`);
    //     }

    //     const updatedProduct = {
    //         ...this.products[productIndex],
    //         ...updateProductDto,
    //     };
    //     this.products[productIndex] = updatedProduct;
    //     return updatedProduct;
    // }   
}
